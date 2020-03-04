import { Service, Property, Required } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { Series, DataFrame } from 'dataframe-js';
import { FrappeatorProject, FrappeProjectTemplateFile, FrappeMultiProject } from '../../entity/v4/FrappeatorProject';

import util = require('util');

//https://www.npmjs.com/package/class-transformer
import { plainToClass } from "class-transformer";

import { dataDir } from '../../Server';

import fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR", explicitArray: false });

@Service()
export class FrappeatorProjectService {
  private connection: Connection;

  constructor(private typeORMService: TypeORMService) {
  }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get();
  }

  async create(proj: FrappeatorProject): Promise<FrappeatorProject> {
    await this.connection.manager.save(proj);
    console.log("Saved a new proj with id: " + proj.id);

    return proj;
  }

  async find(): Promise<FrappeatorProject[]> {
    // let projects: any[] = await this.connection.manager.find(Project);
    let projects = await this.importXMLs();

    return projects;
  }

  async findOne(id: number): Promise<FrappeatorProject> {
    const proj: any = await this.connection.manager.findOne(FrappeatorProject, id);
    return proj;
  }


  async importXMLs(): Promise<FrappeatorProject[]> {

    let projectList: FrappeatorProject[] = [];

    try {
      let projects = fs.readdirSync(`${dataDir}/`);
      console.log('Found ' + projects.length + ' projects');

      for (let p of projects) {

        if (p.split('.').pop() == 'proj') {
          let xml_string = fs.readFileSync(`${dataDir}/${p}`, "utf8");
          parser.parseString(xml_string, function(error, result) {
            if (error === null) {
              let xp = plainToClass(FrappeatorProject, result.frappeator_project);
              projectList.push(xp);
            }
            else {
              console.warn(error);
            }
          });
        }
      }
    } catch (err) {
      console.warn(err);
    }
    return projectList;
  }
}

export class Project {
  version: string;
}
