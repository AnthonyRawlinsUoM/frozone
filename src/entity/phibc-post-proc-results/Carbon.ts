import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Carbon {
    @PrimaryColumn('integer')
    scenario_id: number;

    @Column('integer')
    fire_id: number;

    @Column('real')
    fuel_consumed: number;

    @Column('real')
    carbon_released: number;
}
