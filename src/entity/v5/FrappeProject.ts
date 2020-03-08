import { Project } from '../v1/Project';
// https://www.npmjs.com/package/class-transformer
import { Type, Expose, plainToClass } from "class-transformer";
import { Property, Required } from '@tsed/common';
import { Column } from 'typeorm';
import { FrappeMultiProject } from '../v4/FrappeatorProject';



export class HydroSettings {

  @Property()
  @Expose() run_hydro;

  @Property()
  @Expose() rusle_settings;
}

export class RusleSettings {

  @Property()
  @Expose() c_peak;

  @Property()
  @Expose() c_harvpeak;

  @Property()
  @Expose() xic_fire;

  @Property()
  @Expose() xik_fire;

  @Property()
  @Expose() xic_harv;

  @Property()
  @Expose() xik_harv;

  @Property()
  @Expose() k_fire_multiplier;

  @Property()
  @Expose() k_harv_multiplier;

  @Property()
  @Expose() r_climate;
}

export class SuccessionSettings {

  @Property()
  @Expose() landis_data_available;

  @Property()
  @Expose() harvest_data_available;

  @Property()
  @Expose() run_biomass;

  @Property()
  @Expose() run_harvest;
}

export class FrappeProject extends Project {
  @Expose() ATTR: Object;  // Minimum v5

  @Property()
  @Required()
  @Column('text')
  @Expose() project_name: string;

  @Property()
  @Column('text')
  @Expose() project_descr: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() frost_machinery_data_root_dir: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() frost_output_results_root_dir: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() run_biodiversity: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() run_genasset: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() run_infrustruct: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() run_people_house_loss: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() run_viewshed: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() run_gma: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() run_carbon: string;

  // @Type(() => FrappeMultiProject)
  @Property()
  @Required()
  @Expose() multiparts: Array<FrappeMultiProject>;

  // @Type(() => FrappeProjectTemplateFile)
  @Property()
  @Required()
  @Expose() hydro_settings: HydroSettings;

  @Property()
  @Required()
  @Expose() succession_settings: SuccessionSettings;
}
