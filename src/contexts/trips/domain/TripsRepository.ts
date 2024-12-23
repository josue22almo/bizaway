import { SortAlgorithm } from "./SortAlgorithm";
import { Trip } from "./Trip";
import { IATA3 } from "./IATA3";


export abstract class TripsRepository {
  abstract byId(id: string): Promise<Trip>;
  abstract byQuery(
    origin: IATA3,
    destination: IATA3,
    sortAlgorithm: SortAlgorithm
  ): Promise<Trip[]>;
  abstract save(trip: Trip): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract all(): Promise<Trip[]>;
}
