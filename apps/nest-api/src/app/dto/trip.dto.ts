import { ApiProperty } from '@nestjs/swagger';

import { IATA3, Trip, TripVisitor } from '@bizaway/contexts';

export class TripDto implements TripVisitor {
  @ApiProperty({
    description: 'The id of the trip',
    example: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
  })
  id!: string;

  @ApiProperty({
    description: 'The origin airport code',
    example: 'LON',
  })
  origin!: IATA3;

  @ApiProperty({
    description: 'The destination airport code',
    example: 'NYC',
  })
  destination!: IATA3;

  @ApiProperty({
    description: 'The cost of the trip',
    example: 100,
  })
  cost!: number;

  @ApiProperty({
    description: 'The duration of the trip',
    example: 100,
  })
  duration!: number;

  @ApiProperty({
    description: 'The type of the trip',
    example: 'one-way',
  })
  type!: string;

  @ApiProperty({
    description: 'The display name of the trip',
    example: 'London to New York',
  })
  display_name!: string;

  constructor(trip: Trip) {
    trip.accept(this);
  }

  setId(id: string): void {
    this.id = id;
  }
  setOrigin(origin: IATA3): void {
    this.origin = origin;
  }
  setDestination(destination: IATA3): void {
    this.destination = destination;
  }
  setCost(cost: number): void {
    this.cost = cost;
  }
  setDuration(duration: number): void {
    this.duration = duration;
  }
  setType(type: string): void {
    this.type = type;
  }
  setDisplayName(displayName: string): void {
    this.display_name = displayName;
  }
}

