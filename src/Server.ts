import { $log, GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from "@tsed/common";
import * as Path from "path";
import "@tsed/typeorm";
import "@tsed/swagger";
import "@tsed/socketio"; // import socketio Ts.ED module

import {join} from "path";
import { RestController } from "./controllers/RestController";

const rootDir = Path.resolve(__dirname);

const session = require("express-session");
@ServerSettings({

    statics: {
        "/statics": join(__dirname, "..", "statics")
    },
    socketIO: {
        // ... see configuration
        // adapter: ,
        // origins: ,
        path: '/socket.io'
    },
    typeorm: [
        {
            name: "default",
            type: "sqlite",
            database: "database.sqlite",
            synchronize: true,
            logging: false,
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
        }
    ],
    httpPort: 8000,
    httpsPort: 8443,
    rootDir,
    acceptMimes: ["application/json"],
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
})
export class Server extends ServerLoader {

    constructor(settings) {
        super(settings);
    }    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void | Promise<any> {

        $log.debug("Bootstrapping Frozone Server...");

        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');



        this.use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }
}
