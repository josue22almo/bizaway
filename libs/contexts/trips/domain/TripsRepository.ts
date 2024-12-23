import { SortStrategy } from "./SortStrategy";
import { Trip } from "./Trip";
import { IATA3 } from "./IATA3";


export abstract class TripsRepository {
  abstract byQuery(
    origin: IATA3,
    destination: IATA3,
    sortStrategy: SortStrategy
  ): Promise<Trip[]>;
  abstract all(): Promise<Trip[]>;
  abstract save(trip: Trip): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
