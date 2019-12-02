import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class BioDiversity {
    @PrimaryColumn('integer')
    scenario_id: number;

    @Column('integer')
    fire_id: number;

    @Column('integer')
    num_wet_forest_veg_cells_burnt: number;

    @Column('integer')
    num_refuge_cells_burnt: number;

    @Column('integer')
    num_nature_print_cells_burnt: number;

    @Column('integer')
    num_ldb_possum_cells_burnt: number;
}
