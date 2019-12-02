import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PeopleHouseLoss {
  @PrimaryColumn('integer')
  scenario_id: number;

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
}
