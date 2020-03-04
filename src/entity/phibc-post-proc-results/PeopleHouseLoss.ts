import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Example, Description } from "@tsed/swagger";
import { Minimum, Required, Property } from "@tsed/common";

@Entity()
export class PeopleHouseLoss {

  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;
  @Column('integer')
  scenario_id: number;

  @Property()
  @Required()
  @Column('integer')
  people_exposed: number;

  @Property()
  @Required()
  @Column('integer')
  people_lost_ratio_method: number;

  @Property()
  @Required()
  @Column('integer')
  people_lost_harris_method: number;

  @Property()
  @Required()
  @Column('integer')
  houses_exposed: number;

  @Property()
  @Required()
  @Column('integer')
  houses_lost: number;

  @Property()
  @Required()
  @Column('integer')
  com_build_exposed: number;
}
