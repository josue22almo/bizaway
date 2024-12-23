import { SortStrategy } from "./SortStrategy";
import { Trip } from "./Trip";

export class CheapestSortStrategy implements SortStrategy {
  sort(trips: Trip[]): Trip[] {
    return trips.sort((a, b) => a.cost - b.cost);
  }
}
