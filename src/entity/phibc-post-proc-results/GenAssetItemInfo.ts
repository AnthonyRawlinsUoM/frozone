import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class GenAssetItemInfo {
    @PrimaryColumn('integer')
    asset_id: number;

    @Column('text')
    asset_group: string;

    @Column('text')
    description: string;
}
