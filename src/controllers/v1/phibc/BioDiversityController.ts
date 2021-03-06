import { PathParams, MergeParams, BodyParams, Controller, Get, Post, ContentType } from "@tsed/common";
import { ReturnsArray, Returns } from "@tsed/swagger";
import { SummaryService, Summary } from "../../../migration/services/SummaryService";
import { BioDiversity } from "../../../entity/phibc-post-proc-results/BioDiversity";
import { BioDiversityService } from "../../../migration/services/BioDiversityService";
import { Observable } from 'rxjs';
import { parse } from 'json2csv';

// import { getManager, getRepository } from "typeorm";
// import { User } from "../../entity/User";

@Controller("/bio_diversity")
export class BioDiversityController {

    constructor(
      private ss: SummaryService,
      private es: BioDiversityService) { }

    @Get("/")
    @ReturnsArray(BioDiversity)
    async getList(): Promise<BioDiversity[]> {
        return this.es.find();
    }

    @Get("/summary/")
    @ReturnsArray(Summary)
    async getSummary(@PathParams("summary") summary: string): Promise<Summary> {
      return this.es.find().then((res) => this.ss.summarize(res));
    }

    @Get("/csv/")
    @ContentType('application/csv')
    async getCSV(): Promise<BioDiversity[]> {
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
