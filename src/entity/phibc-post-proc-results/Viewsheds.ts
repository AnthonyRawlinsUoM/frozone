import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Viewsheds {

  @Column('integer')
  fireyear_WF_scenario_id: number;

  @Column('integer')
  fireyear_PB_scenario_id: number;

  @PrimaryColumn('integer')
  viewshed_id: number;

  @Column('real')
  average_sbpa: number;
}
