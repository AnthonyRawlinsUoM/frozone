import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Infrastructure {
  @PrimaryColumn('integer')
  scenario_id: number;

  @Column('integer')
  road_length_loss: number;

  @Column('integer')
  powerline_length_loss: number;

  @Column('integer')
  fh1_units_lost: number;

  @Column('integer')
  fh2_units_lost: number;

  @Column('integer')
  fh3_units_lost: number;

  @Column('integer')
  fh4_units_lost: number;

  @Column('integer')
  fh5_units_lost: number;
}
