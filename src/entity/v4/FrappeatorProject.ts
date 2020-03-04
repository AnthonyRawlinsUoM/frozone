import { Project } from './Project';
// https://www.npmjs.com/package/class-transformer
import { Type, Expose, plainToClass } from "class-transformer";
import { Property, Required } from '@tsed/common';
import { Column } from 'typeorm';

export class FrappeProjectTemplateFile {
  @Property()
  @Required()
  @Column('text')
  @Expose() id: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() path: string;
}

export class FrappeMultiProject {
  @Property()
  @Required()
  @Column('text')
  @Expose() frost_output_results_dir_rel_path: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() frappe_project_file_id: string;
}

export class FrappeatorProject extends Project {
  @Expose() ATTR: Object;

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
  @Expose() glaciator_output_results_root_dir_path: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() frappeator_output_root_dir_path: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() frappe_exe_path: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() is_frost_multi_proj: string;

  @Property()
  @Required()
  @Column('text')
  @Expose() concurrent_threads: string;

  // @Type(() => FrappeMultiProject)
  @Property()
  @Required()
  @Expose() multiparts: FrappeMultiProject[];

  // @Type(() => FrappeProjectTemplateFile)
  @Property()
  @Required()
  @Expose() templates: FrappeProjectTemplateFile[];
}
