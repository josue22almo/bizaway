import { SortAlgorithm } from "./SortAlgorithm";
import { Trip } from "./Trip";

export class CheapestSortAlgorithm implements SortAlgorithm {
  sort(trips: Trip[]): Trip[] {
    return trips.sort((a, b) => a.cost - b.cost);
  }
}
