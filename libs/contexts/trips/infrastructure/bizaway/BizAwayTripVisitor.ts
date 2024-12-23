import { TripVisitor, IATA3, Trip } from "../../domain";
import { BizAwayTrip } from "./BizAwayTrip";

export class BizAwayTripVisitor implements TripVisitor {

  private id = '';
  private origin = IATA3.EMPTY;
  private destination = IATA3.EMPTY;
  private cost = 0;
  private duration = 0;
  private type = '';
  private display_name = '';

  constructor(trip: Trip) {
    trip.accept(this);
  }

  setId(id: string): void {
    this.id = id;
  }
  setOrigin(origin: IATA3): void {
    this.origin = origin;
  }
  setDestination(destination: IATA3): void {
    this.destination = destination;
  }
  setCost(cost: number): void {
    this.cost = cost;
  }
  setDuration(duration: number): void {
    this.duration = duration;
  }
  setType(type: string): void {
    this.type = type;
  }
  setDisplayName(displayName: string): void {
    this.display_name = displayName;
  }

  flatten(): BizAwayTrip {
    return {
      id: this.id,
      origin: this.origin,
      destination: this.destination,
      cost: this.cost,
      duration: this.duration,
      type: this.type,
      display_name: this.display_name,
    };
  }
}
