import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { StatusDaConta, TipoDaConta } from 'generated/prisma/enums';

export class FilterContaDto {
  @ApiPropertyOptional({
    description: 'Tipo da conta',
    enum: Object.values(TipoDaConta),
    enumName: 'TipoDaConta',
  })
  @IsOptional()
  @IsEnum(Object.values(TipoDaConta))
  tipo: TipoDaConta;
  @ApiPropertyOptional({
    description: 'Status da conta',
    enum: Object.values(StatusDaConta),
    enumName: 'StatusDaConta',
  })
  @IsOptional()
  @IsEnum(Object.values(StatusDaConta))
  status: StatusDaConta;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descricao: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  valorMinimo: number;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  valorMaximo: number;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  dataDeVencimentoInicio: Date;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  dataDeVencimentoFim: Date;
  @ApiProperty({
    required: false,
    description: 'Número da página para paginação',
  })
  @IsOptional()
  @Type(() => Number)
  page?: number;
  @ApiProperty({ required: false, description: 'Limite de itens por página' })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

export class PaginateDataDTO<T> {
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  data: T[];
  @ApiProperty()
  total: number;
}
