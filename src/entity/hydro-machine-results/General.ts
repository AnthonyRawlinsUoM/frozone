import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class General {
    @PrimaryColumn('real')
    simgrid_left: number;

    @Column('real')
    simgrid_bottom: number;

    @Column('real')
    simgrid_cell_size: number;

    @Column('integer')
    simgrid_row_count: number;

    @Column('integer')
    simgrid_col_count: number;
}
