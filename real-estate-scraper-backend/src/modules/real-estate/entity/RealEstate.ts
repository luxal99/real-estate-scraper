import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity("real_estate", { schema: "real_estate_scrapper" })
export class RealEstate {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Expose()
  @Column("varchar", { name: "title", nullable: true, length: 1024 })
  title: string;

  @Expose()
  @Column("varchar", { name: "link", nullable: true, length: 256 })
  link: string;

  @Expose()
  @Column("varchar", { name: "picture", nullable: true, length: 256 })
  picture: string;

  @Expose()
  @Column("double", { name: "price", nullable: true, precision: 22 })
  price: number;

  @Expose()
  @Column("int", { name: "area", nullable: true })
  area: number;
}
