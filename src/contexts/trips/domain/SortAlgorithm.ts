import { Trip } from "./Trip";

export interface SortAlgorithm {
  sort(trips: Trip[]): Trip[];
}
