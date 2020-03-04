import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class WaterYieldGeneralResults {
    @PrimaryColumn('integer')
    calculated_after_scenario_id: number;

    @Column('integer')
    catchment_id: number;

    @Column('real')
    sum_of_all_simcell_mean_annual_streamflow: number;

    @Column('real')
    catchment_prop_burnt_by_WF: number;
}
