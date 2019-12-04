import {Controller, Get, PathParams, MergeParams} from "@tsed/common";
// import { getManager, getRepository } from "typeorm";
// import { User } from "../../entity/User";

@Controller("/carbon")
export class CarbonController {

    @Get("/")
    getAll() {
        // return getManager().find(User);
        return [
            {"replicate_id": 1},
            {"replicate_id": 2},
            {"replicate_id": 3}
        ]
    }

    @Get("/:id")
    async get(@PathParams("id") id: number) {
        // return getRepository(User).findOne(id);
        return {"id": 1, "type": "Carbon"}
    }

    // @Get("/min")
    // async getMinimum() {
    //     // return getRepository(User).findOne(id);
    //     return {"id": 1, "type": "Carbon"}
    // }
    //
    // @Get("/max")
    // async getMaximum() {
    //     // return getRepository(User).findOne(id);
    //     return {"id": 1, "type": "Carbon"}
    // }
    //
    // @Get("/mean")
    // async getMean() {
    //     // return getRepository(User).findOne(id);
    //     return {"id": 1, "type": "Carbon"}
    // }
    //
    // @Get("/median")
    // async getMedian() {
    //     // return getRepository(User).findOne(id);
    //     return {"id": 1, "type": "Carbon"}
    // }
    //
    // @Get("/std")
    // async getStandardDeviation() {
    //     // return getRepository(User).findOne(id);
    //     return {"id": 1, "type": "Carbon"}
    // }

    @Get("/:id/summary/")
    async summarize() {
        return {
            carbon_released: {
                min: 0,
                max: 1,
                mean: 0.5,
                median: 0.5,
                std: 1.0,
                count: 3
            },
            fuel_consumed: {
                min: 0,
                max: 1,
                mean: 0.5,
                median: 0.5,
                std: 1.0,
                count: 3
            },
            fire_id: {},
            scenario_id: {}
        }
    }
}
