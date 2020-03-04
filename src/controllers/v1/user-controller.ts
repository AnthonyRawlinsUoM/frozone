import { PathParams, MergeParams, BodyParams, Controller, Get, Post } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { User } from "../../entity/User";
import { UsersService } from "../../migration/services/UsersService";
// import { getManager, getRepository } from "typeorm";

@Controller("/users")
export class UserController {

    constructor(private usersService: UsersService) { }

    @Get("/")
    @ReturnsArray(User)
    async getList(): Promise<User[]> {
        return this.usersService.find();
    }

    @Get("/:id")
    async get(@PathParams("id") id: number) {
        return this.usersService.findOne(id);
        // return { "id": 1, "type": "User" }
    }

    @Post("/")
    create(@BodyParams() user: User): Promise<User> {
        return this.usersService.create(user);
    }

}
