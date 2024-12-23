import { IATA3 } from "./IATA3";

export class Trip {
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


