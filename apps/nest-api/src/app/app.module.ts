import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './controller/app.controller';
import { CreateTripServiceImpl } from './services/create/create-trip.service';
import { DeleteTripServiceImpl } from './services/delete/delete-trip.service';
import { FindTripsServiceImpl } from './services/find/find-trips.service';

import { MergedTripsRepository, TripsRepository, CreateTripService, DeleteTripService, FindTripsService } from '@bizaway/contexts';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: TripsRepository,
          useFactory: (configService: ConfigService) => {
            return new MergedTripsRepository(
              configService.get('BIZAWAY_BASE_URL')!,
              configService.get('BIZAWAY_API_KEY')!
            );
          },
          inject: [ConfigService],
        },
        {
          provide: CreateTripService,
          useClass: CreateTripServiceImpl,
        },
        {
          provide: FindTripsService,
          useClass: FindTripsServiceImpl,
        },
        {
          provide: DeleteTripService,
          useClass: DeleteTripServiceImpl,
        },
      ],
    };
  }
}
