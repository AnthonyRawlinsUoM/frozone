import { PathParams, MergeParams, BodyParams, Controller, Get, Post } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { SummaryService, Summary } from "../../../migration/services/SummaryService";

import { Carbon } from "../../../entity/phibc-post-proc-results/Carbon";
import { CarbonService } from "../../../migration/services/CarbonService";

@Controller("/carbon")
export class CarbonController {

  constructor(
    private ss: SummaryService,
    private es: CarbonService) { }

  @Get("/")
  @ReturnsArray(Carbon)
  async getList(): Promise<Carbon[]> {
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
