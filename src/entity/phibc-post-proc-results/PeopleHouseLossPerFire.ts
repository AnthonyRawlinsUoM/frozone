import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Description } from '@tsed/swagger';

@Entity()
export class PeopleHouseLossPerFire {

  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;

  @Column('integer')
  scenario_id: number;

  @Column('integer')
  fire_id: number;

  @Column('integer')
  people_exposed: number;

  @Column('integer')
  people_lost_ratio_method: number;

  @Column('integer')
  people_lost_harris_method: number;

  @Column('integer')
  houses_exposed: number;

  @Column('integer')
  houses_lost: number;

  @Column('integer')
  com_build_exposed: number;

  @Column('integer')
  com_build_lost: number;

  @Column('integer')
  ind_build_exposed: number;

  @Column('integer')
  ind_build_lost: number;
}
