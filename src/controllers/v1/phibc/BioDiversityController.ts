import { PathParams, MergeParams, BodyParams, Controller, Get, Post } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { BioDiversity } from "../../../entity/phibc-post-proc-results/BioDiversity";
import { BioDiversityService } from "../../../services/BioDiversityService";
// import { getManager, getRepository } from "typeorm";
// import { User } from "../../entity/User";

@Controller("/bio_diversity")
export class BioDiversityController {

    constructor(private es: BioDiversityService) { }

    @Get("/")
    @ReturnsArray(BioDiversity)
    async getList(): Promise<BioDiversity[]> {
        return this.es.find();
    }

    @Get("/:id")
    async get(@PathParams("id") id: number) {
        return this.es.findOne(id);
    }

}
