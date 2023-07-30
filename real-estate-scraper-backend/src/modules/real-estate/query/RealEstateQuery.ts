import { IsNumber, ValidateIf } from "class-validator";
import { Transform } from "class-transformer";
export class RealEstateQuery {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  page: number;
  @IsNumber()
  @ValidateIf(({ priceFrom }) => priceFrom)
  priceFrom: number;
  @IsNumber()
  @ValidateIf(({ priceFrom }) => priceFrom)
  priceTo: number;
  @IsNumber()
  @ValidateIf(({ priceFrom }) => priceFrom)
  areaFrom: number;
  @IsNumber()
  @ValidateIf(({ priceFrom }) => priceFrom)
  areaTo: number;

  constructor() {}
}
