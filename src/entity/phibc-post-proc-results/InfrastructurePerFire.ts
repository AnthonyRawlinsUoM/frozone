import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Description } from '@tsed/swagger';

@Entity()
export class InfrastructurePerFire {

  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;

  @Column('integer')
  scenario_id: number;

  @Column('integer')
  fire_id: number;

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
