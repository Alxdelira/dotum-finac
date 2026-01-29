import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { PrismaService } from 'src/prisma.service';
import { FilterContaDto } from './dto/filter-conta.dto';
import { Prisma } from 'generated/prisma/browser';
import { FilterAPagarDto } from './dto/filter-a-pagar.dto';

@Injectable()
export class ContaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContaDto) {
    if (!dto.descricao || dto.descricao.trim() === '') {
      throw new BadRequestException('Descrição é obrigatória');
    }
    if (!dto.tipo) {
      throw new BadRequestException('Tipo é obrigatório');
    }
    if (!dto.status) {
      throw new BadRequestException('Status é obrigatório');
    }
    if (dto.valor == null || dto.valor < 0) {
      throw new BadRequestException('Valor deve ser maior ou igual a zero');
    }
    if (!dto.dataDeVencimento) {
      throw new BadRequestException('Data de vencimento é obrigatória');
    }

    const conta = await this.prisma.entradaDeConta.create({
      data: dto,
    });
    return { message: 'Conta criada com sucesso', data: conta };
  }

  async findAll(querys: FilterContaDto) {
    const filters: Prisma.EntradaDeContaWhereInput = {};

    const page = querys.page || 1;
    const limit = querys.limit || 10;

    if (querys.tipo) {
      filters.tipo = querys.tipo;
    }
    if (querys.status) {
      filters.status = querys.status;
    }
    if (querys.descricao) {
      filters.descricao = { contains: querys.descricao };
    }
    if (querys.valorMinimo) {
      filters.valor = { gte: querys.valorMinimo };
    }
    if (querys.valorMaximo) {
      filters.valor = { lte: querys.valorMaximo };
    }
    if (querys.dataDeVencimentoInicio) {
      filters.dataDeVencimento = { gte: querys.dataDeVencimentoInicio };
    }
    if (querys.dataDeVencimentoFim) {
      filters.dataDeVencimento = { lte: querys.dataDeVencimentoFim };
    }
    if (querys.dataDeVencimentoInicio && querys.dataDeVencimentoFim) {
      filters.dataDeVencimento = {
        gte: querys.dataDeVencimentoInicio,
        lte: querys.dataDeVencimentoFim,
      };
    }

    const [total, data] = await Promise.all([
      this.prisma.entradaDeConta.count({ where: filters }),
      this.prisma.entradaDeConta.findMany({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      page,
      data,
    };
  }

  async valorTotalDasContas(queryPagar: FilterAPagarDto): Promise<number> {
    const filters: Prisma.EntradaDeContaWhereInput = {};
    if (queryPagar.tipo) {
      filters.tipo = queryPagar.tipo;
    }
    if (queryPagar.status) {
      filters.status = queryPagar.status;
    }
    const result = await this.prisma.entradaDeConta.aggregate({
      where: {
        tipo: filters.tipo,
        status: filters.status,
      },
      _sum: {
        valor: true,
      },
    });
    return result._sum.valor ? result._sum.valor.toNumber() : 0;
  }
}
