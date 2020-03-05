import { $log, GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from "@tsed/common";
import * as Path from "path";
import "@tsed/typeorm";
import "@tsed/swagger";
import "@tsed/socketio"; // import socketio Ts.ED module
import { join } from "path";
import { RestController } from "./controllers/RestController";
import "reflect-metadata";

const rootDir = Path.resolve(__dirname);
export const dataDir = Path.join(rootDir, 'data');

const session = require("express-session");

@ServerSettings()
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
