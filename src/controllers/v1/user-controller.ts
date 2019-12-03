import {Controller, Get, PathParams, MergeParams} from "@tsed/common";
// import { getManager, getRepository } from "typeorm";
// import { User } from "../../entity/User";

@Controller("/users")
export class UserController {

    @Get("/users")
    getAll() {
        // return getManager().find(User);
        return [{"id": 1}]
    }

    @Get("/users/:id")
    async get(@PathParams("id") id: number) {
        // return getRepository(User).findOne(id);
        return {"id": 1, "type": "User"}
    }

}