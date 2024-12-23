import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { IATA3, Trip, type SortBy, CreateTripService, FindTripsService, DeleteTripService } from '@bizaway/contexts';

import { CreateTripDto } from '../dto/create-trip.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('trips')
export class AppController {
  constructor(
    private readonly createTripService: CreateTripService,
    private readonly findTripsService: FindTripsService,
    private readonly deleteTripService: DeleteTripService,
  ) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.createTripService.create(
      createTripDto.origin,
      createTripDto.destination,
      createTripDto.cost,
      createTripDto.duration,
      createTripDto.type,
      createTripDto.display_name
    );
  }

  @Get()
  @ApiQuery({ name: 'origin', type: String, required: true, example: IATA3.BCN })
  @ApiQuery({ name: 'destination', type: String, required: true, example: IATA3.AMS })
  @ApiQuery({ name: 'sort_by', type: String, required: true, example: 'cheapest' })
  findByQuery(
    @Query('origin') origin: IATA3,
    @Query('destination') destination: IATA3,
    @Query('sort_by') sortBy: SortBy
  ): Promise<Trip[]> {
    return this.findTripsService.findByQuery(origin, destination, sortBy);
  }

  @Get('all')
  findAll(): Promise<Trip[]> {
    return this.findTripsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteTripService.delete(id);
  }
}
