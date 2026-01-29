import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  Get,
  Query,
} from '@nestjs/common';
import { ContaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { FilterContaDto } from './dto/filter-conta.dto';
import { FilterAPagarDto } from './dto/filter-a-pagar.dto';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @ApiBadRequestResponse({
    examples: {
      SemDescricao: {
        summary: 'Sem descrição',
        value: new BadRequestException('Descrição é obrigatória').getResponse(),
      },
      SemTipo: {
        summary: 'Sem tipo',
        value: new BadRequestException('Tipo é obrigatório').getResponse(),
      },
      SemStatus: {
        summary: 'Sem status',
        value: new BadRequestException('Status é obrigatório').getResponse(),
      },
      ValorInvalido: {
        summary: 'Valor inválido',
        value: new BadRequestException(
          'Valor deve ser maior ou igual a zero',
        ).getResponse(),
      },
      SemDataDeVencimento: {
        summary: 'Sem data de vencimento',
        value: new BadRequestException(
          'Data de vencimento é obrigatória',
        ).getResponse(),
      },
      DataDeVencimentoInvalida: {
        summary: 'Data de vencimento inválida',
        value: new BadRequestException(
          'Data de vencimento inválida',
        ).getResponse(),
      },
      DataDePagamentoInvalida: {
        summary: 'Data de pagamento inválida',
        value: new BadRequestException(
          'Data de pagamento inválida',
        ).getResponse(),
      },
      ErrorDesconhecido: {
        summary: 'Erro desconhecido',
        value: new InternalServerErrorException().getResponse(),
      },
    },
  })
  @ApiResponse({
    status: 201,
    type: CreateContaDto,
  })
  @Post()
  create(@Body() createContaDto: CreateContaDto) {
    return this.contaService.create(createContaDto);
  }

  @Get()
  findAll(@Query() querys: FilterContaDto) {
    return this.contaService.findAll(querys);
  }

  @Get('valor-total')
  valorTotalDasContas(@Query() queryPagar: FilterAPagarDto) {
    return this.contaService.valorTotalDasContas(queryPagar);
  }
}
