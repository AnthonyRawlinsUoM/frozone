import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Example, Description} from "@tsed/swagger";
import {Minimum, Required, Property} from "@tsed/common";

@Entity()
export class GenAsset {
    @PrimaryColumn('integer')
    scenario_id: number;

    @Column('text')
    grid_name: string;

    @Column('integer')
    asset_id: number;

    @Column('integer')
    total_asset_id_cells: number;

    @Column('text')
    most_severe_fire_impact_level: string;

    @Column('integer')
    affected_cells: number;
}
