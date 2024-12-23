import { IATA3 } from "../../domain";

export interface BizAwayTrip {
  origin: IATA3;
  destination: IATA3;
  cost: number;
  duration: number;
  type: string;
  id: string;
  display_name: string;
}
