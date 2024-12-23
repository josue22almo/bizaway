import { IATA3, SortStrategy, Trip, TripsRepository } from "../domain";
import { BizAwayApi } from "./bizaway/BizAwayApi";
import { BizAwayTrip } from "./bizaway/BizAwayTrip";
import { BizAwayTripVisitor } from "./bizaway/BizAwayTripVisitor";

export class MergedTripsRepository implements TripsRepository {
  private readonly apiClient: BizAwayApi;
  private trips: BizAwayTrip[] = [];

  constructor(baseUrl: string, apiKey: string) {
    this.apiClient = new BizAwayApi(baseUrl, apiKey);
  }

  async byQuery(origin: IATA3, destination: IATA3, sortStrategy: SortStrategy): Promise<Trip[]> {
    const bizAwayTrips = await this.apiClient.getTripsByQuery(origin, destination);
    const trips = this.mapManyTrips(bizAwayTrips);
    return sortStrategy.sort(trips);
  }

  async save(trip: Trip): Promise<void> {
    this.trips.push(new BizAwayTripVisitor(trip).flatten());
  }

  async delete(id: string): Promise<void> {
    this.trips = this.trips.filter(trip => trip.id !== id);
  }

  async all(): Promise<Trip[]> {
    return this.mapManyTrips(this.trips);
  }

  private mapManyTrips(bizAwayTrips: BizAwayTrip[]): Trip[] {
    return bizAwayTrips.map(trip => this.mapTrip(trip));
  }

  private mapTrip(bizAwayTrip: BizAwayTrip): Trip {
    return new Trip(
      bizAwayTrip.id,
      bizAwayTrip.origin,
      bizAwayTrip.destination,
      bizAwayTrip.cost,
      bizAwayTrip.duration,
      bizAwayTrip.type,
      bizAwayTrip.display_name
    );
  }
}