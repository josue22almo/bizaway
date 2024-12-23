import { IATA3 } from "./IATA3";
import { v4 as uuid } from "uuid";

export class Trip {
  static create(
    origin: IATA3,
    destination: IATA3,
    cost: number,
    duration: number,
    type: string,
    display_name: string
  ): Trip {
    return new Trip(uuid(), origin, destination, cost, duration, type, display_name);
  }

  constructor(
    private readonly id: string,
    private readonly origin: IATA3,
    private readonly destination: IATA3,
    readonly cost: number,
    readonly duration: number,
    private readonly type: string,
    private readonly display_name: string
  ) {}
}


