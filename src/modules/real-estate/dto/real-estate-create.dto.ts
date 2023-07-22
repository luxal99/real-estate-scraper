import {Column, PrimaryGeneratedColumn} from "typeorm";

export class RealEstateCreateDto {

    title: string;
    link: string;
    picture: string;
    price: number;
    area: number;
}
