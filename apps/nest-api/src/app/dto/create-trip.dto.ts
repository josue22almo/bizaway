import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IATA3 } from '@bizaway/contexts';

export class CreateTripDto {
  @ApiProperty({
    description: 'The origin airport code',
    example: 'LON',
  })
  @IsNotEmpty()
  @IsString()
  origin!: IATA3;

  @ApiProperty({
    description: 'The destination airport code',
    example: 'NYC',
  })
  @IsNotEmpty()
  @IsString()
  destination!: IATA3;

  @ApiProperty({
    description: 'The cost of the trip',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  cost!: number;

  @ApiProperty({
    description: 'The duration of the trip',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  duration!: number;

  @ApiProperty({
    description: 'The type of the trip',
    example: 'one-way',
  })
  @IsNotEmpty()
  @IsString()
  type!: string;

  @ApiProperty({
    description: 'The display name of the trip',
    example: 'London to New York',
  })
  @IsNotEmpty()
  @IsString()
  display_name!: string;
}

