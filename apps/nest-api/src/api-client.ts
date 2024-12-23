import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app/app.module';
import { IATA3, SortBy } from '@bizaway/contexts';
import { CreateTripDto } from './app/dto/create-trip.dto';
 

export interface Response<T = any> {
  status: number;
  body: T;
}


export class ApiClient {
  private readonly app: INestApplication;

 
  static async new() {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule.forRoot(),
      ],
    }).compile();

    const apiClient = new ApiClient(moduleRef);
    await apiClient.init();

    return apiClient;
  }

  constructor(moduleRef: TestingModule) {
    this.app = moduleRef.createNestApplication({});
    this.app.useGlobalPipes(new ValidationPipe());
  }

  async init() {
    await this.app.init();
  }

  async close() {
    await this.app.close();
  }

  async getTrips(origin: IATA3, destination: IATA3, sortBy: SortBy) {
    return request(this.app.getHttpServer()).get('/trips').query({ origin, destination, sort_by: sortBy });
  }

  async getAllTrips() {
    return request(this.app.getHttpServer()).get('/trips/all');
  }

  async createTrip(trip: CreateTripDto) {
    return request(this.app.getHttpServer()).post('/trips').send(trip);
  }

  async deleteTrip(id: string) {
    return request(this.app.getHttpServer()).delete(`/trips/${id}`);
  }
}

