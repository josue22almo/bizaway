import { SortAlgorithm } from "./SortAlgorithm";
import { Trip } from "./Trip";

export class FastestSortAlgorithm implements SortAlgorithm {
  sort(trips: Trip[]): Trip[] {
    return trips.sort((a, b) => a.duration - b.duration);
  }
}
