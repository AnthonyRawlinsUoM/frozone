import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Example, Description} from "@tsed/swagger";
import {Minimum, Required, Property} from "@tsed/common";

@Entity()
export class GenAsset {
  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;
    @Column('integer')
    scenario_id: number;

    @Property()
    @Required()
    @Column('text')
    grid_name: string;

    @Property()
    @Required()
    @Column('integer')
    asset_id: number;

    @Property()
    @Required()
    @Column('integer')
    total_asset_id_cells: number;

    @Property()
    @Required()
    @Column('text')
    most_severe_fire_impact_level: string;

    @Property()
    @Required()
    @Column('integer')
    affected_cells: number;
}
