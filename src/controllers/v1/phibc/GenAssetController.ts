import {Controller, Get, PathParams, MergeParams} from "@tsed/common";
// import { getManager, getRepository } from "typeorm";
// import { User } from "../../entity/User";

@Controller("/gen_asset")
export class GenAssetController {

    @Get("/")
    getAll() {
        // return getManager().find(User);
        return [{"id": 1}]
    }

    @Get("/:id")
    async get(@PathParams("id") id: number) {
        // return getRepository(User).findOne(id);
        return {"id": 1, "type": "GenAsset"}
    }

}
