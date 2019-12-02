import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class GenAssetProb {
    @PrimaryColumn('integer')
    asset_id: number;

    @Column('text')
    asset_group: string;

    @Column('text')
    fire_impact_level: string;

    @Column('text')
    damage_level: string;

    @Column('real')
    prob_mean: number;

    @Column('real')
    prob_median: number;

    @Column('real')
    prob_wtdmean: number;
}
