import { CreateTripService } from './CreateTripService';
import { IATA3, Trip, TripsRepository } from '../../domain';

describe('CreateTripService', () => {
  let service: CreateTripService;
  let mockRepository: jest.Mocked<TripsRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      delete: jest.fn(),
      byQuery: jest.fn(),
      all: jest.fn(),
    };

    service = new CreateTripService(mockRepository);
  });

  describe('create', () => {
    it('should create a trip with the provided data', async () => {
      const tripData = {
        origin: IATA3.MAD,
        destination: IATA3.BCN,
        cost: 100,
        duration: 120,
        type: 'train',
        display_name: 'Madrid - Barcelona'
      };

      mockRepository.save.mockResolvedValueOnce();

      const trip = await service.create(
        tripData.origin,
        tripData.destination,
        tripData.cost,
        tripData.duration,
        tripData.type,
        tripData.display_name
      );

      expect(trip).toBeInstanceOf(Trip);
      expect(trip).toEqual(expect.objectContaining({
        origin: IATA3.MAD,
        destination: IATA3.BCN,
        cost: 100,
        duration: 120,
        type: 'train',
        display_name: 'Madrid - Barcelona'
      }));
    });

    it('should save the created trip in the repository', async () => {
      const tripData = {
        origin: IATA3.MAD,
        destination: IATA3.BCN,
        cost: 100,
        duration: 120,
        type: 'train',
        display_name: 'Madrid - Barcelona'
      };

      mockRepository.save.mockResolvedValueOnce();

      const trip = await service.create(
        tripData.origin,
        tripData.destination,
        tripData.cost,
        tripData.duration,
        tripData.type,
        tripData.display_name
      );

      expect(mockRepository.save).toHaveBeenCalledWith(trip);
    });

    it('should generate different ids for different trips', async () => {
      mockRepository.save.mockResolvedValue();

      const trip1 = await service.create(
        IATA3.MAD,
        IATA3.BCN,
        100,
        120,
        'train',
        'Madrid - Barcelona'
      );

      const trip2 = await service.create(
        IATA3.BCN,
        IATA3.MAD,
        150,
        120,
        'train',
        'Barcelona - Madrid'
      );

      // @ts-expect-error: Should expect
      expect((trip1 as { id: string }).id).not.toBe((trip2 as { id: string }).id);
    });
  });
}); 