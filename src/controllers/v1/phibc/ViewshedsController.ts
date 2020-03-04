import { PathParams, MergeParams, BodyParams, Controller, Get, Post, ContentType } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { SummaryService, Summary } from "../../../migration/services/SummaryService";

import { Viewsheds } from "../../../entity/phibc-post-proc-results/Viewsheds";
import { ViewshedsService } from "../../../migration/services/ViewshedsService";

import { parse } from 'json2csv';


@Controller("/Viewsheds")
export class ViewshedsController {

  constructor(
    private ss: SummaryService,
    private es: ViewshedsService) { }

  @Get("/")
  @ReturnsArray(Viewsheds)
  async getList(): Promise<Viewsheds[]> {
      return this.es.find();
  }

  @Get("/summary/")
  @ReturnsArray(Summary)
  async getSummary(@PathParams("summary") summary: string): Promise<Summary> {
    return this.es.find().then((res) => this.ss.summarize(res));
  }

  @Get("/csv/")
  @ContentType('application/csv')
  async getCSV(): Promise<Viewsheds[]> {
    let csv;
    let data = await this.es.find();

    try {
      csv = parse(data, {});
    } catch (err) {
      console.error(err);
    }
    return csv;
  }


  @Get("/:id")
  async get(@PathParams("id") id: number) {
      return this.es.findOne(id);
  }
}
