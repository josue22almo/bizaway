import { IATA3 } from "../../domain";

export interface InMemoryTrip {
  id: string;
  origin: IATA3;
  destination: IATA3;
  cost: number;
  duration: number;
  type: string;
  display_name: string;
}
