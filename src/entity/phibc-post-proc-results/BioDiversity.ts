import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Example, Description} from "@tsed/swagger";
import {Minimum, Required, Property} from "@tsed/common";

@Entity()
export class BioDiversity {

    @Description('Database assigned id')
    @PrimaryColumn()
  _id: number;

    @Column('integer')
    scenario_id: number;

    @Property()
    @Required()
    @Column('integer')
    fire_id: number;

    @Property()
    @Required()
    @Column('integer')
    num_wet_forest_veg_cells_burnt: number;

    @Property()
    @Required()
    @Column('integer')
    num_refuge_cells_burnt: number;

    @Property()
    @Required()
    @Column('integer')
    num_nature_print_cells_burnt: number;

    @Property()
    @Required()
    @Column('integer')
    num_ldb_possum_cells_burnt: number;
}
