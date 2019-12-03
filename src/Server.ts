import { $log, ServerLoader, ServerSettings } from "@tsed/common";
import * as Path from "path";
import "@tsed/typeorm";
import "@tsed/socketio"; // import socketio Ts.ED module

const rootDir = Path.resolve(__dirname);

@ServerSettings({
    socketIO: {
        // ... see configuration
        adapter: ,
        origins: ,
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
                `${__dirname}/entity/*{.ts,.js}`
            ],
            migrations: [
                `${__dirname}/migrations/*{.ts,.js}`
            ],
            subscribers: [
                `${__dirname}/subscriber/*{.ts,.js}`
            ],
            cli": {
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
        "/rest": "${rootDir}/controllers/current/**/*.js",
        "/rest/v1": [
            "${rootDir}/controllers/v1/users/*.js",
            "${rootDir}/controllers/v1/groups/**/*.ts", // support ts entry
            // "!${rootDir}/controllers/v1/groups/old/*.ts", // support ts entry
        ]
    }
})
export class Server extends ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void | Promise<any> {

        $log.debug("Bootstrapping Frozone Server...");

        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');

        // .use(GlobalAcceptMimesMiddleware)

        this
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
