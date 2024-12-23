import { IATA3, Trip, TripsRepository } from "../../domain";

export class CreateTripService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async create(
    origin: IATA3,
    destination: IATA3,
    cost: number,
    duration: number,
    type: string,
    display_name: string
  ): Promise<Trip> {
    const trip = Trip.create(origin, destination, cost, duration, type, display_name);
    await this.tripsRepository.save(trip);
    return trip;
  }
}
