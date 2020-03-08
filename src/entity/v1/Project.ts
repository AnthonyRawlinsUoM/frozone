import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Example, Description} from "@tsed/swagger";
import {Minimum, Required, Property} from "@tsed/common";

@Entity()
export class Project {
  @Description('Database assigned id')
  @PrimaryGeneratedColumn()
  id: number;
}
