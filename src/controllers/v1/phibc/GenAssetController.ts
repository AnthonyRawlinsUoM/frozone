import { PathParams, MergeParams, BodyParams, Controller, Get, Post, ContentType } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { SummaryService, Summary } from "../../../migration/services/SummaryService";
import { GenAsset } from '../../../entity/phibc-post-proc-results/GenAsset';
import { GenAssetService } from '../../../migration/services/GenAssetService';
// import { getManager, getRepository } from "typeorm";
// import { User } from "../../entity/User";

import { parse } from 'json2csv';


@Controller("/gen_asset")
export class GenAssetController {

  constructor(
    private ss: SummaryService,
    private es: GenAssetService) { }

  @Get("/")
  @ReturnsArray(GenAsset)
  async getList(): Promise<GenAsset[]> {
    return this.es.find();
  }


  @Get("/summary/")
  @ReturnsArray(Summary)
  async getSummary(@PathParams("summary") summary: string): Promise<Summary> {
    return this.es.find().then((res) => this.ss.summarize(res));
  }

  @Get("/csv/")
  @ContentType('application/csv')
  async getCSV(): Promise<GenAsset[]> {
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
