import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Example, Description } from "@tsed/swagger";
import { Minimum, Required, Property } from "@tsed/common";

@Entity()
export class Carbon {

  @Description('Database assigned id')
  @PrimaryColumn('integer')
  scenario_id: number;


  @Property()
  @Required()
  @Column('integer')
  fire_id: number;


  @Property()
  @Required()
  @Column('real')
  fuel_consumed: number;


  @Property()
  @Required()
  @Column('real')
  carbon_released: number;
}
