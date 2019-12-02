import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Region1 {
    @PrimaryColumn('integer')
    scenario_id: number;

    @Column('real')
    shannon_index: number;

    @Column('real')
    frac_index: number;

    @Column('integer')
    eco_fire_group_id: number;

    @Column('real')
    rel_entropy_age_class_ss: number;
}
