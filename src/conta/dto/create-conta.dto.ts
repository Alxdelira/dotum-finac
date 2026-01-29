import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusDaConta, TipoDaConta } from 'generated/prisma/enums';

export class CreateContaDto {
  @ApiProperty({
    description: 'Descrição da conta',
    example: 'Conta de luz',
  })
  @IsString()
  @IsNotEmpty({ message: 'A descrição da conta é obrigatória' })
  descricao: string;

  @ApiProperty({
    description: 'Tipo da conta',
    example: TipoDaConta.PAGAR,
    enum: TipoDaConta,
  })
  @IsEnum(Object.values(TipoDaConta))
  @IsNotEmpty({ message: 'O tipo da conta é obrigatório' })
  tipo: TipoDaConta;

  @ApiProperty({
    description: 'Status da conta',
    example: StatusDaConta.PENDENTE,
    enum: StatusDaConta,
  })
  @IsEnum(Object.values(StatusDaConta))
  @IsNotEmpty({ message: 'O status da conta é obrigatório' })
  status: StatusDaConta;

  @ApiProperty({
    description: 'Valor da conta',
    example: 150.75,
  })
  @IsNotEmpty({ message: 'O valor da conta é obrigatório' })
  valor: number;

  @ApiProperty({
    description: 'Data de vencimento da conta',
    example: new Date(),
  })
  @IsNotEmpty({ message: 'A data de vencimento da conta é obrigatória' })
  dataDeVencimento: Date;

  @ApiProperty({
    description: 'Data de pagamento da conta',
    example: new Date(),
    required: false,
  })
  dataDePagamento?: Date;
}
