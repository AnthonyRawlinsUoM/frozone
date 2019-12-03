import {$log, ServerLoader} from "@tsed/common";
import { Server } from "./Server";

async function bootstrap() {
  try {
    $log.debug("Starting Frozone Server...");
    const server = await ServerLoader.bootstrap(Server);

    await server.listen();
    $log.debug("Frozone Server initialized");

  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
