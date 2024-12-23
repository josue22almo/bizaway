import { IATA3 } from "./IATA3";


export interface TripVisitor {
  setId(id: string): void;
  setOrigin(origin: IATA3): void;
  setDestination(destination: IATA3): void;
  setCost(cost: number): void;
  setDuration(duration: number): void;
  setType(type: string): void;
  setDisplayName(displayName: string): void;
}
