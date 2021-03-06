import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Description } from '@tsed/swagger';

@Entity()
export class BioDiversityTfi {
  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;

    @Column('integer')
    scenario_id: number;

    @Column('integer')
    fire_id: number;

    @Column('integer')
    efg_id: number;

    @Column('integer')
    num_fuelcells_affected_before_min_tfi: number;

    @Column('integer')
    num_fuelcells_affected_after_max_tfi: number;

    @Column('real')
    fuelcell_area: number;
}
