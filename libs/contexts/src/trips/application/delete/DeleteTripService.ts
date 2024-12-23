import { TripsRepository } from "../../domain";

export class DeleteTripService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async delete(id: string): Promise<void> {
    await this.tripsRepository.delete(id);
  }
}
