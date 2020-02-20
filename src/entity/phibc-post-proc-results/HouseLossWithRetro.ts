import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Example, Description} from "@tsed/swagger";
import {Minimum, Required, Property} from "@tsed/common";

@Entity()
export class HouseLossWithRetro {
    @PrimaryColumn('integer')
    scenario_id: number;

    @Column('text')
    intensity_threshold_grid_name: string;

    @Column('text')
    retro_house_count_grid_name: string;

    @Column('integer')
    houses_lost: number;
}
