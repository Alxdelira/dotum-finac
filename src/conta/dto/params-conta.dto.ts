import { IsNotEmpty, IsUUID } from 'class-validator';

export class ParamsBrindeDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
