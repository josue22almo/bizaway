import { CheapestSortStrategy } from "./CheapestSortStrategy";
import { FastestSortStrategy } from "./FastestSortAlgorithm";
import { SortBy } from "./SortBy";
import { SortStrategy } from "./SortStrategy";

export class SortStrategyFactory {
  static create(sortBy: SortBy): SortStrategy {
    return sortBy === "fastest" ? new FastestSortStrategy() : new CheapestSortStrategy();
  }
}
