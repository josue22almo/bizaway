import { Injectable } from "@nestjs/common";

import { TripsRepository, CreateTripService } from "@bizaway/contexts";

@Injectable()
export class CreateTripServiceImpl extends CreateTripService {
  constructor(tripsRepository: TripsRepository) {
    super(tripsRepository);
  }
}
