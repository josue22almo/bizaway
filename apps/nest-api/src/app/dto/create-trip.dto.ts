import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

import { IATA3 } from '@bizaway/contexts';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  origin!: IATA3;

  @IsNotEmpty()
  @IsString()
  destination!: IATA3;

  @IsNotEmpty()
  @IsNumber()
  cost!: number;

  @IsNotEmpty()
  @IsNumber()
  duration!: number;

  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsString()
  display_name!: string;
}

