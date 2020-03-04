import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class WaterRusleResults {
    @PrimaryColumn('integer')
    calculated_after_scenario_id: number;

    @Column('integer')
    catchment_id: number;

    @Column('real')
    mean_annual_erosion_rate: number;

    @Column('real')
    catchment_prop_burnt: number;

    @Column('real')
    catchment_prop_harvested: number;
}
