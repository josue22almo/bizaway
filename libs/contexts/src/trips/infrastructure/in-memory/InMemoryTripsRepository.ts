import { IATA3, SortStrategy, Trip, TripsRepository } from "../../domain";
import { InMemoryTrip } from "./InMemoryTrip";
import { InMemoryTripVisitor } from "./InMemoryTripVisitor";

export class InMemoryTripsRepository implements TripsRepository {
  private trips: InMemoryTrip[] = [];

  async byQuery(origin: IATA3, destination: IATA3, sortStrategy: SortStrategy): Promise<Trip[]> {
    const trips = this.trips.filter(trip => trip.origin === origin && trip.destination === destination);
    return sortStrategy.sort(this.mapManyInMemoryTripsToTrips(trips));
  }
  async save(trip: Trip): Promise<void> {
    this.trips.push(new InMemoryTripVisitor(trip).flatten());
  }
  async delete(id: string): Promise<void> {
    this.trips = this.trips.filter(trip => trip.id !== id);
  }

  async all(): Promise<Trip[]> {
    return this.mapManyInMemoryTripsToTrips(this.trips);
  }

  private mapInMemoryTripToTrip(inMemoryTrip: InMemoryTrip): Trip {
    return new Trip(inMemoryTrip.id, inMemoryTrip.origin, inMemoryTrip.destination, inMemoryTrip.cost, inMemoryTrip.duration, inMemoryTrip.type, inMemoryTrip.display_name);
  }

  private mapManyInMemoryTripsToTrips(inMemoryTrips: InMemoryTrip[]): Trip[] {
    return inMemoryTrips.map(trip => this.mapInMemoryTripToTrip(trip));
  }
}


