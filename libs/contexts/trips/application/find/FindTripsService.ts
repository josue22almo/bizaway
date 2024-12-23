import { IATA3, SortBy, Trip, TripsRepository } from "../../domain";
import { SortStrategyFactory } from "../../domain/SortStrategyFactory";

export class FindTripsService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async findByQuery(origin: IATA3, destination: IATA3, sortBy: SortBy): Promise<Trip[]> {
    const sortStrategy = SortStrategyFactory.create(sortBy);
    return this.tripsRepository.byQuery(origin, destination, sortStrategy);
  }

  async findAll(): Promise<Trip[]> {
    return this.tripsRepository.all();
  }
}
