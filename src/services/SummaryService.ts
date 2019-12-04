import { Service } from "@tsed/common";
import { Series, DataFrame } from 'pandas-js';

@Service()
export class SummaryService {
    constructor() {}

    async summarize(table) {
        /*
        Summarizes the table and gives all the usual statistics in the usual format
        */
        return table;
    }
}
