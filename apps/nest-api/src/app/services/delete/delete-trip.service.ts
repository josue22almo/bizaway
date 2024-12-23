import { Injectable } from "@nestjs/common";

import { TripsRepository, DeleteTripService } from "@bizaway/contexts";

@Injectable()
export class DeleteTripServiceImpl extends DeleteTripService {
  constructor(tripsRepository: TripsRepository) {
    super(tripsRepository);
  }
}
