import { PathParams, MergeParams, BodyParams, Controller, Get, Post } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { SummaryService, Summary } from "../../../migration/services/SummaryService";

import { Infrastructure } from "../../../entity/phibc-post-proc-results/Infrastructure";
import { InfrastructureService } from "../../../migration/services/InfrastructureService";

@Controller("/Infrastructure")
export class InfrastructureController {

  constructor(
    private ss: SummaryService,
    private es: InfrastructureService) { }

  @Get("/")
  @ReturnsArray(Infrastructure)
  async getList(): Promise<Infrastructure[]> {
      return this.es.find();
  }

  @Get("/summary/")
  @ReturnsArray(Summary)
  async getSummary(@PathParams("summary") summary: string): Promise<Summary> {
    return this.es.find().then((res) => this.ss.summarize(res));
  }

  @Get("/:id")
  async get(@PathParams("id") id: number) {
      return this.es.findOne(id);
  }
}
