import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Example, Description} from "@tsed/swagger";
import {Minimum, Required, Property} from "@tsed/common";

@Entity()
export class Infrastructure {
  @Description('Database assigned id')
  @PrimaryColumn()
  _id: number;
  @Column('integer')
  scenario_id: number;

  @Property()
  @Required()
  @Column('integer')
  road_length_loss: number;

  @Property()
  @Required()
  @Column('integer')
  powerline_length_loss: number;

  @Property()
  @Required()
  @Column('integer')
  fh1_units_lost: number;

  @Property()
  @Required()
  @Column('integer')
  fh2_units_lost: number;

  @Property()
  @Required()
  @Column('integer')
  fh3_units_lost: number;

  @Property()
  @Required()
  @Column('integer')
  fh4_units_lost: number;

  @Property()
  @Required()
  @Column('integer')
  fh5_units_lost: number;
}
