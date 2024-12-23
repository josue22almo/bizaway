import { Trip } from "./Trip";

export interface SortStrategy {
  sort(trips: Trip[]): Trip[];
}
