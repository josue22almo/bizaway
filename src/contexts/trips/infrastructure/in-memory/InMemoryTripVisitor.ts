import { TripVisitor, Trip, IATA3 } from "../../domain";
import { InMemoryTrip } from "./InMemoryTrip";

export class InMemoryTripVisitor implements TripVisitor {
  private trip: InMemoryTrip;

  constructor(trip: Trip) {
    this.trip = {
      id: '',
      origin: IATA3.EMPTY,
      destination: IATA3.EMPTY,
      cost: 0,
      duration: 0,
      type: '',
      display_name: ''
    };
    trip.accept(this);
  }

  setId(id: string): void {
    this.trip.id = id;
  }
  setOrigin(origin: IATA3): void {
    this.trip.origin = origin;
  }
  setDestination(destination: IATA3): void {
    this.trip.destination = destination;
  }
  setCost(cost: number): void {
    this.trip.cost = cost;
  }
  setDuration(duration: number): void {
    this.trip.duration = duration;
  }
  setType(type: string): void {
    this.trip.type = type;
  }
  setDisplayName(displayName: string): void {
    this.trip.display_name = displayName;
  }

  flatten(): InMemoryTrip {
    return this.trip;
  }
}
