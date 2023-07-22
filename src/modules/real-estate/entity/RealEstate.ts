import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("real_estate", { schema: "real_estate_scrapper" })
export class RealEstate {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 1024 })
  title: string ;
  @Column("varchar", { name: "link", nullable: true, length: 256 })
  link: string ;

  @Column("varchar", { name: "picture", nullable: true, length: 256 })
  picture: string ;


  @Column("double", { name: "price", nullable: true, precision: 22 })
  price: number ;

  @Column("int", { name: "area", nullable: true })
  area: number ;
}
