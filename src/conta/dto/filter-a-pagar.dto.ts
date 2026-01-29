import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusDaConta, TipoDaConta } from 'generated/prisma/enums';

export class FilterAPagarDto {
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
}
