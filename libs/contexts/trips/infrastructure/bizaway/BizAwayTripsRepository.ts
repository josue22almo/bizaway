import { IATA3, SortStrategy, Trip, TripsRepository } from "../../domain";
import { BizAwayApi } from "./BizAwayApi";
import { BizAwayTrip } from "./BizAwayTrip";

export class BizAwayApiRepository implements TripsRepository {
  private readonly apiClient: BizAwayApi;
  constructor(apiKey: string) {
    this.apiClient = new BizAwayApi(apiKey);
  }

  async byQuery(origin: IATA3, destination: IATA3, sortStrategy: SortStrategy): Promise<Trip[]> {
    const bizAwayTrips = await this.apiClient.getTripsByQuery(origin, destination);
    const trips = this.mapManyBizAwayTripsToTrips(bizAwayTrips);
    return sortStrategy.sort(trips);
  }

  async all(): Promise<Trip[]> {
    const bizAwayTrips = await this.apiClient.getAllTrips();
    return this.mapManyBizAwayTripsToTrips(bizAwayTrips);
  }

  save(trip: Trip): Promise<void> {
    return this.apiClient.saveTrip(trip);
  }

  delete(id: string): Promise<void> {
    return this.apiClient.deleteTrip(id);
  }

  private mapManyBizAwayTripsToTrips(bizAwayTrips: BizAwayTrip[]): Trip[] {
    return bizAwayTrips.map(trip => this.mapBizAwayTripToTrip(trip));
  }

  private mapBizAwayTripToTrip(bizAwayTrip: BizAwayTrip): Trip {
    return new Trip(bizAwayTrip.id, bizAwayTrip.origin, bizAwayTrip.destination, bizAwayTrip.cost, bizAwayTrip.duration, bizAwayTrip.type, bizAwayTrip.display_name);
  }
}
