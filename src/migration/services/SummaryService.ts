import { Service } from "@tsed/common";
import { Series, DataFrame } from 'pandas-js';

@Service()
export class SummaryService {
    constructor() {}

    async summarize(table) {
        /*
        Summarizes the table and gives all the usual statistics in the usual format
        */

        console.log(table);

        const df = new DataFrame([{x:1, y:1},{x:2, y:3},{x:2, y:4},{x:4, y:1},{x:4, y:3},{x:5, y:3}]);

        console.log(df.toString());
        let medians = [];
        let mins = [];
        let maxes = [];

        for (let col of df.columns) {
          let col_data = df.get(col)._data;

          mins.push(Math.min(...col_data));
          maxes.push(Math.max(...col_data));
          medians.push(await this.median([...col_data]));
        }

        return {
          columns: df.columns,
          min: mins,
          max: maxes,
          mean: df.mean()._data,
          median: medians,
          std: df.std()._data,
          count: df.length
        };

    }

    async median(numbers: number[]): Promise<number> {

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
  columns: string[];
  min: number[];
  max: number[];
  mean: number[];
  median: number[];
  std: number[];
  count: number[];
}
