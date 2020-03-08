import { $log, ServerLoader } from "@tsed/common";
import util = require('util');

//https://www.npmjs.com/package/class-transformer
import * as Path from "path";
import * as glob from 'glob';
import { join } from "path";
import { plainToClass } from "class-transformer";
import { Server } from "./Server";
import { FrappeatorProject, FrappeProjectTemplateFile, FrappeMultiProject } from './entity/v4/FrappeatorProject';
import { createConnections } from "typeorm";
import { RestController } from "./controllers/RestController";

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR", explicitArray: false });

const rootDir = Path.resolve(__dirname);
const dataDir = `${__dirname}/data/`;

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

/*
  Hydra - the multiheaded Database Connection Manager

  Finds and indexes using naming conventions the connections to each output database
  Consolidation and aggregation happen later.

*/
async function hydra() {

  let projects = await findFrappeatorProjects(dataDir);
  let connection_strings = [];

  for (let p of projects) {
    console.log(p);

    let conn = connectionTemplate;

    // This next line is an ASSUMPTION based on context in the XML file.
    // Need to validate with the schema!
    let weather_path = `${p.glaciator_output_results_root_dir_path.split('\\').pop()}`;

    const path_to_db_store =  `${dataDir}${p.project_name}/${weather_path}/index.sqlite`;
    conn.name = `${p.project_name}_${weather_path}`; // longwinded naming convention for indexing of database:
    conn.database = path_to_db_store;
    // connection_strings.push(conn);
    console.log(conn);
    connection_strings.push(conn);
  }
  // Now we attempt make and store connectins to these databases
  // This could potentially be a huge prospect.

  return await createConnections(connection_strings);
}


// Utility Functions for Path Parsing
async function findFrappeatorProjects(rootDir): Promise<FrappeatorProject[]> {
  // The data directory contains the Frappeator outputs and configuration files
  $log.debug('Scanning for Frappeator Projects in: ' + rootDir);

  let projectList: FrappeatorProject[] = [];

  try {

    let projects = fs.readdirSync(rootDir);
    $log.debug('Found ' + projects.length + ' projects');

    for (let p of projects) {

      if (p.split('.').pop() == 'proj') {
        let xml_string = fs.readFileSync(`${dataDir}/${p}`, "utf8");
        parser.parseString(xml_string, function(error, result) {
          if (error === null) {
            let xp = plainToClass(FrappeatorProject, result.frappeator_project);
            projectList.push(xp);
          } else {
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


/*
  Go through the configuration and ensure the listed files and folders exist
*/
async function validateProjectContents(fp: FrappeatorProject) {
  // Each Frappeator run has a configuration file
  $log.debug('Scanning Frappeator Project for consistency.');

  // Check configured paths
  const project_dir = await fs.promises.opendir(fp.project_name);
  for await (const dirent of project_dir) {
    $log.debug(dirent.name + ' exists!');
  }

  const weather_folder = `${dataDir}${fp.project_name}/${fp.glaciator_output_results_root_dir_path.split('\\').pop()}`;

  $log.debug(weather_folder);


  // TODO
  return true;
}


/*
  The replicates SHOULD be searched for based on metadata from the XMLs
  However, this data is in files I don't have access to, so some assumptions have been made.
  I'll glob the folders based on file naming conventions.
  */
async function findReplicateRuns(dir) {
  /* Depending on configuration multiple runs could have been generated using different weather streams */
  let files = [];
  glob(dir + '*', {}, function(err, files) {
    files = files;
  });

  $log.debug('Found ' + files.length + ' replicates for this run.');
  return files;
}

async function findRegimeRuns(dir) {
  /* Depending on configuration multiple runs could have been generated using different weather streams */
  let files = [];
  glob(dir + '*', {}, function(err, files) {
    files = files;
  });

  $log.debug('Found ' + files.length + ' regimes for this Frappeator Project.');
  return files;
}

function findFrappeProject(dir) {
  $log.debug('This particular run is configured:');
  const DEFAULT_FILE_NAME_CONVENTION = '.frappe.proj';
  const minimum_version = 5;

}

function findPostProcessingOutputs(dir) {
  const DEFAULT_POST_PROCESSING_FOLDER = 'post_processing_output';
  const GMA = 'gma_post_proc_results.sqlite';
  const PHIBC = 'phibc_post_proc_results.sqlite';
  const HYDRO = 'hydro_machine_results.sqlite';
  const SUCC = 'succession_results.sqlite';

  // new Connection for each found db file
  // Ensure proper naming

}

function generateConnectionStringForTypeORM(sqliteDB) {
  let conn = connectionTemplate;
  // TODO
  return conn;
}


async function bootstrap() {
  try {
    $log.debug("Starting Frozone Server...");
    $log.debug("Frozone Server will now scan for Frappeator Projects...");

    // dynamically create db connections based on Frappeator Project configs
    const multiple_connections = await hydra();

    // now inject multiple named connections into serverconfig
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
      debug: true,
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
