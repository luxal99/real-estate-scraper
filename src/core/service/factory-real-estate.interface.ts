import {UrlType} from "../types/url.type";
import {RealEstateCreateDto} from "../../modules/real-estate/dto/real-estate-create.dto";

export interface FactoryRealEstateInterface {
    getNewestRealEstates(url: UrlType, realEstateData: RealEstateCreateDto[]):Promise<RealEstateCreateDto[]>;
}
