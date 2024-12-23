import { FindTripsService } from './FindTripsService';
import { IATA3, Trip, TripsRepository } from '../../domain';
import { CheapestSortStrategy, FastestSortStrategy } from '../../domain';

describe('FindTripsService', () => {
  let service: FindTripsService;
  let mockRepository: jest.Mocked<TripsRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      delete: jest.fn(),
      byQuery: jest.fn(),
      all: jest.fn(),
    };

    service = new FindTripsService(mockRepository);
  });

  describe('findByQuery', () => {
    const mockTrips: Trip[] = [
      new Trip('1', IATA3.MAD, IATA3.BCN, 100, 120, 'train', 'Madrid - Barcelona'),
      new Trip('2', IATA3.MAD, IATA3.BCN, 150, 90, 'plane', 'Madrid - Barcelona'),
    ];

    it('should find trips with cheapest sort strategy', async () => {
      mockRepository.byQuery.mockResolvedValueOnce(mockTrips);

      await service.findByQuery(IATA3.MAD, IATA3.BCN, 'cheapest');

      expect(mockRepository.byQuery).toHaveBeenCalledWith(
        IATA3.MAD,
        IATA3.BCN,
        expect.any(CheapestSortStrategy)
      );
    });

    it('should find trips with fastest sort strategy', async () => {
      mockRepository.byQuery.mockResolvedValueOnce(mockTrips);

      await service.findByQuery(IATA3.MAD, IATA3.BCN, 'fastest');

      expect(mockRepository.byQuery).toHaveBeenCalledWith(
        IATA3.MAD,
        IATA3.BCN,
        expect.any(FastestSortStrategy)
      );
    });

    it('should return trips from repository', async () => {
      mockRepository.byQuery.mockResolvedValueOnce(mockTrips);

      const result = await service.findByQuery(IATA3.MAD, IATA3.BCN, 'cheapest');

      expect(result).toEqual(mockTrips);
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Repository error');
      mockRepository.byQuery.mockRejectedValueOnce(error);

      await expect(
        service.findByQuery(IATA3.MAD, IATA3.BCN, 'cheapest')
      ).rejects.toThrow('Repository error');
    });
  });

  describe('findAll', () => {
    const mockTrips: Trip[] = [
      new Trip('1', IATA3.MAD, IATA3.BCN, 100, 120, 'train', 'Madrid - Barcelona'),
      new Trip('2', IATA3.BCN, IATA3.MAD, 150, 90, 'plane', 'Barcelona - Madrid'),
    ];

    it('should return all trips from repository', async () => {
      mockRepository.all.mockResolvedValueOnce(mockTrips);

      const result = await service.findAll();

      expect(result).toEqual(mockTrips);
      expect(mockRepository.all).toHaveBeenCalled();
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Repository error');
      mockRepository.all.mockRejectedValueOnce(error);

      await expect(service.findAll()).rejects.toThrow('Repository error');
    });

    it('should return empty array when no trips exist', async () => {
      mockRepository.all.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });
}); 