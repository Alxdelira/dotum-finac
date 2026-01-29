import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const PaginatedSwagger = <TModel extends Type<any>>(model: TModel) => {
  const modelName = model.name;

  class PaginatedResponse {
    @ApiProperty()
    totalPages: number;
    @ApiProperty()
    page: number;
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [model] })
    data: InstanceType<TModel>[];
  }

  Object.defineProperty(PaginatedResponse, 'name', {
    value: `Paginated${modelName}Response`,
  });

  return PaginatedResponse;
};

export type PaginateResponse<T> = {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
};
