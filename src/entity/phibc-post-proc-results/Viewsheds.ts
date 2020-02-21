import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Property, Required } from '@tsed/common';
import { Description } from '@tsed/swagger';

@Entity()
export class Viewsheds {

  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;
  @Column('integer')
  fireyear_WF_scenario_id: number;

  @Property()
  @Required()
  @Column('integer')
  fireyear_PB_scenario_id: number;

  @Property()
  @Required()
  @PrimaryColumn('integer')
  viewshed_id: number;

  @Property()
  @Required()
  @Column('real')
  average_sbpa: number;
}
