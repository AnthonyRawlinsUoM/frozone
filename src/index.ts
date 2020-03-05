import {$log, ServerLoader} from "@tsed/common";
import util = require('util');

//https://www.npmjs.com/package/class-transformer
import * as Path from "path";
import { join } from "path";
import { plainToClass } from "class-transformer";
import { Server } from "./Server";
import { FrappeatorProject, FrappeProjectTemplateFile, FrappeMultiProject } from './entity/v4/FrappeatorProject';
import {createConnections} from "typeorm";

import { RestController } from "./controllers/RestController";

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR", explicitArray: false });

const rootDir = Path.resolve(__dirname);
const dataDir = `${__dirname}/data/`;

async function importXMLs(): Promise<FrappeatorProject[]> {

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

const connectionTemplate = {
  name: "default",
  type: "sqlite",
  database: "%%path%%",
  synchronize: true,
  logging: true,
  entities: [
    `${__dirname}/entity/**/*{.ts,.js}`
  ],
  migrations: [
    `${__dirname}/migrations/**/*{.ts,.js}`
  ],
  subscribers: [
    `${__dirname}/subscriber/**/*{.ts,.js}`
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
};


async function hydra() {

  // Hardcoded dummy for testing
  // let projects = ['a.sqlite', 'b.sqlite', 'c.sqlite'];

  let projects = await importXMLs();
  let connection_strings = [];

  for (let p of projects) {
    console.log(p);
    for(const m of p.multiparts['FrappeMultiProject']) {
      let conn = connectionTemplate;
      conn.name = `${p.project_name}_${p.project_name}_${m.frappe_project_file_id}`;
      conn.database = `${dataDir}${m.frost_output_results_dir_rel_path}`;
      connection_strings.push(conn);
      console.log(conn);
    }
  }

  const connections = await createConnections(connection_strings);

  return connections;
}

async function bootstrap() {
  try {
    $log.debug("Starting Frozone Server...");
    $log.debug("Frozone Server is scanning for Frappeator Projects...");

    // dynamically create db connections based on Frappeator Project configs
    const multiple_connections = await hydra();

    // now inject multiple connections into serverconfig

    let settings = {

      statics: {
        "/statics": join(__dirname, "..", "statics")
      },
      socketIO: {
        // ... see configuration
        // adapter: ,
        // origins: ,
        path: '/socket.io'
      },
      typeorm: multiple_connections,
      httpPort: 8001,
      httpsPort: 8443,
      rootDir,
      acceptMimes: ["application/json", "application/csv"],
      mount: {
        "/rest": RestController,
        "/rest/v1": [
          "${rootDir}/controllers/v1/*.js",
          "${rootDir}/controllers/v1/**/*.ts", // support ts entry
          // "!${rootDir}/controllers/v1/groups/old/*.ts", // support ts entry
        ]
      },
      swagger: [
        {
          path: "/api-docs"
        }
      ]
    }

    const server = new Server(settings);

    await server.listen();
    $log.debug("Frozone Server initialized");

  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
