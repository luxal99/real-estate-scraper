import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { RealEstateQuery } from "../query/RealEstateQuery";

export const RealEstateQueryParam = createParamDecorator(
  async (data, ctx: ExecutionContext) => {
    const query = ctx.switchToHttp().getRequest().query.q || null;
      return JSON.parse(JSON.parse(JSON.stringify(query)))
  }
);
