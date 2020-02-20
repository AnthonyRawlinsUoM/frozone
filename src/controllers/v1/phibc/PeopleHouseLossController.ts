import { PathParams, MergeParams, BodyParams, Controller, Get, Post } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { PeopleHouseLoss } from "../../../entity/phibc-post-proc-results/PeopleHouseLoss";
import { PeopleHouseLossService } from "../../../migration/services/PeopleHouseLossService";
// import { getManager, getRepository } from "typeorm";

@Controller("/people_house_loss")
export class PeopleHouseLossController {

    constructor(private es: PeopleHouseLossService) { }

    @Get("/")
    @ReturnsArray(PeopleHouseLoss)
    async getList(): Promise<PeopleHouseLoss[]> {
        return this.es.find();
    }

    @Get("/:id")
    async get(@PathParams("id") id: number) {
        return this.es.findOne(id);
    }

}
