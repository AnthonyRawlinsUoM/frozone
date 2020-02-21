import { Service, Property, Required } from "@tsed/common";
import { Series, DataFrame } from 'dataframe-js';

@Service()
export class SummaryService {
    constructor() {}

    async summarize(table) {
        /*
        Summarizes the table and gives all the usual statistics in the usual format
        */

        const df = new DataFrame(table);

        let columns = [];
        let mins = [];
        let maxes = [];
        let means = [];
        let medians = [];
        let deviations = [];

        for (let col of df.listColumns()) {
          // let col_data = df.stat.stats(col);
          if (!col.includes('_id')) {
            mins.push(df.stat.max(col));
            maxes.push(df.stat.max(col));
            means.push(df.stat.mean(col));
            deviations.push(df.stat.sd(col));
            medians.push(this.median(df.select(col).toArray()));

            columns.push(col);
          }
        }

        return {
          columns: columns,
          min: mins,
          max: maxes,
          mean: means,
          median: medians,
          std: deviations,
          count: df.count()
        };

    }


    median(numbers: number[]): number {

      console.log(numbers);

      // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
      let median = 0;
      let numsLen = numbers.length;
      numbers.sort();

      if (
          numsLen % 2 === 0 // is even
      ) {
          // average of two middle numbers
          median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
      } else { // is odd
          // middle number only
          median = numbers[(numsLen - 1) / 2];
      }
      console.log(median);
      return median;
  }
}

export class Summary {
  @Property()
  @Required()
  columns: string[];
  @Property()
  @Required()
  min: number[];
  @Property()
  @Required()
  max: number[];
  @Property()
  @Required()
  mean: number[];
  @Property()
  @Required()
  median: number[];
  @Property()
  @Required()
  std: number[];
  @Property()
  @Required()
  count: number;
}
