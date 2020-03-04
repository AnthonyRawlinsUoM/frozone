import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class WaterQualityResults {
    @PrimaryColumn('real')
    headwater_pos_x: number;

    @Column('real')
    headwater_pos_y: number;

    @Column('integer')
    simcell_index: number;

    @Column('integer')
    catchment_id: number;

    @Column('integer')
    burnt_during_scenario_id: number;

    @Column('integer')
    calculated_after_scenario_id: number;

    @Column('real')
    avg_return_interval_crit_i12: number;
}
