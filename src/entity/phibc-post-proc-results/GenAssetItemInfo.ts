import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Property, Required } from '@tsed/common';
import { Description } from '@tsed/swagger';

@Entity()
export class GenAssetItemInfo {
  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;
    @Column('integer')
    asset_id: number;

    @Property()
    @Required()
    @Column('text')
    asset_group: string;

    @Property()
    @Required()
    @Column('text')
    description: string;
}
