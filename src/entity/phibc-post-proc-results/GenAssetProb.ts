import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Description } from '@tsed/swagger';
import { Property } from '@tsed/common';

@Entity()
export class GenAssetProb {
  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;

  @Property()
  @Column('integer')
  asset_id: number;

  @Property()
  @Column('text')
  asset_group: string;

  @Property()
  @Column('text')
  fire_impact_level: string;

  @Property()
  @Column('text')
  damage_level: string;

  @Property()
  @Column('real')
  prob_mean: number;

  @Property()
  @Column('real', { default: null, nullable: true })
  prob_median: number;

  @Property()
  @Column('real', { default: null, nullable: true })
  prob_wtdmean: number;
}
