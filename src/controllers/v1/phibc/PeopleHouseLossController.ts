import { PathParams, MergeParams, BodyParams, Controller, Get, Post, ContentType } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { PeopleHouseLoss } from "../../../entity/phibc-post-proc-results/PeopleHouseLoss";
import { PeopleHouseLossService } from "../../../migration/services/PeopleHouseLossService";
import { Summary, SummaryService } from '../../../migration/services/SummaryService';
// import { getManager, getRepository } from "typeorm";

import { parse } from 'json2csv';


@Controller("/people_house_loss")
export class PeopleHouseLossController {
  constructor(
    private ss: SummaryService,
    private es: PeopleHouseLossService) { }

    @Get("/")
    @ReturnsArray(PeopleHouseLoss)
    async getList(): Promise<PeopleHouseLoss[]> {
        return this.es.find();
    }

    @Get("/summary/")
    @ReturnsArray(Summary)
    async getSummary(@PathParams("summary") summary: string): Promise<Summary> {
      return this.es.find().then((res) => this.ss.summarize(res));
    }

    @Get("/csv/")
    @ContentType('application/csv')
    async getCSV(): Promise<PeopleHouseLoss[]> {
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
