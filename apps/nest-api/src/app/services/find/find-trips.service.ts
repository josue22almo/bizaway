import { Injectable } from "@nestjs/common";

import { TripsRepository, FindTripsService } from "@bizaway/contexts";

@Injectable()
export class FindTripsServiceImpl extends FindTripsService {
  constructor(tripsRepository: TripsRepository) {
    super(tripsRepository);
  }
}
