import { Injectable } from "@nestjs/common";
import { RealEstate } from "../../entity/RealEstate";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, LessThan, MoreThan, Repository } from "typeorm";
import { RealEstateCreateDto } from "../../dto/real-estate-create.dto";
import { RealEstateSaveException } from "../../../../core/exception/RealEstateSaveException";
import { RealEstateQuery } from "../../query/RealEstateQuery";

@Injectable()
export class RealEstateService {
  constructor(
    @InjectRepository(RealEstate)
    private realEstateRepository: Repository<RealEstate>
  ) {}

  async save(realEstates: RealEstateCreateDto[]): Promise<void> {
    try {
      await this.realEstateRepository.clear()
      await this.realEstateRepository.save(realEstates);
    } catch (err) {
      throw new RealEstateSaveException();
    }
  }

  async getAll(
    realEstateQuery: RealEstateQuery
  ): Promise<{ realEstates: RealEstate[]; numberOfRealEstates: number }> {
    const numberOfRealEstates = await this.realEstateRepository.count();
    const realEstates = await this.realEstateRepository.find({
      take: 20,
      skip: realEstateQuery.page * 20,
      where: {
        price: this.makeWhereQuery(
          realEstateQuery.priceFrom,
          realEstateQuery.priceTo
        ),
        area: this.makeWhereQuery(
          realEstateQuery.areaFrom,
          realEstateQuery.areaTo
        ),
      },
    });

    return { numberOfRealEstates, realEstates };
  }

  makeWhereQuery(from: number, to: number) {
    if (!from && !to) {
      return undefined;
    } else if (!from) {
      return LessThan(to);
    } else if (!to) {
      return MoreThan(from);
    }

    return Between(from, to);
  }
}
