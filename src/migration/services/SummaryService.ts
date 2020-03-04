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

        let index = [];
        let columns = ['min', 'max', 'mean', 'median', 'std'];
        let data = [];

        for (let idx of df.listColumns()) {
          // let col_data = df.stat.stats(col);
          if (!idx.includes('_id')) {
            data.push([
              df.stat.min(idx),
              df.stat.max(idx),
              df.stat.mean(idx),
              this.median(df.select(idx).toArray()),
              df.stat.sd(idx)
            ]);
            index.push(idx);
          }
        }

        return {
          columns: columns,
          index: index,
          data: data
        };

    }


    median(numbers: number[]): number {

      console.log(numbers);

      // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
      let median = 0;
      let numsLen = numbers.length;
      numbers.sort();

      if ( numsLen % 2 === 0) {
          // average of two middle numbers
          median = (numbers[(numsLen / 2) - 1] + numbers[numsLen / 2])  / 2;
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
  index: string[];

  @Property()
  @Required()
  data: any[];

}
