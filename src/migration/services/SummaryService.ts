import { Service } from "@tsed/common";
import { Series, DataFrame } from 'pandas-js';
import * as z from 'zebras';

@Service()
export class SummaryService {
    constructor() {}

    async summarize(table) {
        /*
        Summarizes the table and gives all the usual statistics in the usual format
        */

        console.log(table);

        const df = table;
        let summary_table: Summary;

        for (let col of df) {
          let col_data = z.getCol(col, df);
          summary_table.columns.push(col);
          summary_table.min.push(z.min(col_data));
          summary_table.max.push(z.min(col_data));
          summary_table.mean.push(z.min(col_data));
          summary_table.median.push(z.min(col_data));
          summary_table.std.push(z.min(col_data));
          summary_table.count.push(z.min(col_data));
        }

        return summary_table;
    }
}

export class Summary {
  columns: string[];
  min: number[];
  max: number[];
  mean: number[];
  median: number[];
  std: number[];
  count: number[];
}
