import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Description } from '@tsed/swagger';

@Entity()
export class GenAssetPerFire {
  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;

    @Column('integer')
    scenario_id: number;

    @Column('integer')
    fire_id: number;

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
