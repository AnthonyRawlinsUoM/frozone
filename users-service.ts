import { $log, AfterRoutesInit, Injectable} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import {Connection} from "typeorm";
import {User} from "../entity/User";

@Injectable()
export class UsersService implements AfterRoutesInit {
  private connection: Connection;

  constructor(private typeORMService: TypeORMService) {

  }

  $afterRoutesInit() {
    $log.debug("Loading: Frozone Users");
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async create(user: User): Promise<User> {
    // do something
    // ...
    // Then save
    await this.connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    return user;
  }

  async find(): Promise<User[]> {
    const users = await this.connection.manager.find(User);
    console.log("Loaded users: ", users);

    return users;
  }

}
