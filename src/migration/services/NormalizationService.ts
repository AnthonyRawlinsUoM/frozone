import { Service, Property, Required } from "@tsed/common";
import { Series, DataFrame } from 'dataframe-js';

@Service()
export class NormalizationService {
  constructor() { }

  async normalize(table) {

    // TODO - Dynamic normalization
    // Min-Max Feature Scaling - https://en.wikipedia.org/wiki/Feature_scaling
    // Normalization - https://en.wikipedia.org/wiki/Normalization_(statistics)

    return table;
  }
}
