import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Description } from '@tsed/swagger';

@Entity()
export class HouseLossWithRetroPerFire {

  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;

    @Column('integer')
    scenario_id: number;

    @Column('integer')
    fire_id: number;

    @Column('text')
    intensity_threshold_grid_name: string;

    @Column('text')
    retro_house_count_grid_name: string;

    @Column('integer')
    houses_lost: number;
}
