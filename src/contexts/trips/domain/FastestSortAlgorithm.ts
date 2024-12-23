import { SortStrategy } from "./SortStrategy";
import { Trip } from "./Trip";

export class FastestSortStrategy implements SortStrategy {
  sort(trips: Trip[]): Trip[] {
    return trips.sort((a, b) => a.duration - b.duration);
  }
}
