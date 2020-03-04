import { Service, Property, Required } from "@tsed/common";

import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";

import { Series, DataFrame } from 'dataframe-js';

@Service()
export class ProjectManagerService {
  private connection: Connection;

  constructor(private typeORMService: TypeORMService) {
  }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get();
  }

  async create(proj: Project): Promise<Project> {
      await this.connection.manager.save(proj);
      console.log("Saved a new proj with id: " + proj.id);

      return proj;
  }

  async find(): Promise<Project[]> {
      let projects: any[] = await this.connection.manager.find(Project);

      return projects;
  }

  async findOne(id: number): Promise<Project> {
      const proj:any = await this.connection.manager.findOne(Project, id);
      return proj;
  }
}

export class Project {
  id;
}
