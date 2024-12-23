import { IATA3, Trip } from "../../domain";
import { CheapestSortStrategy, FastestSortStrategy } from "../../domain";
import { BizAwayApiRepository } from "./BizAwayTripsRepository";
import { BizAwayApi } from "./BizAwayApi";
import { BizAwayTrip } from "./BizAwayTrip";

jest.mock('./BizAwayApi');

describe('BizAwayApiRepository', () => {
  const API_KEY = 'test-api-key';
  let repository: BizAwayApiRepository;
  let mockApiClient: jest.Mocked<BizAwayApi>;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new BizAwayApiRepository(API_KEY);

    mockApiClient = (BizAwayApi as jest.MockedClass<typeof BizAwayApi>).mock.instances[0] as jest.Mocked<BizAwayApi>;
  });

  describe('byQuery', () => {
    const mockBizAwayTrips: BizAwayTrip[] = [
      {
        id: '1',
        origin: IATA3.MAD,
        destination: IATA3.BCN,
        cost: 100,
        duration: 120,
        type: 'train',
        display_name: 'Madrid - Barcelona'
      },
      {
        id: '2',
        origin: IATA3.MAD,
        destination: IATA3.BCN,
        cost: 150,
        duration: 90,
        type: 'plane',
        display_name: 'Madrid - Barcelona'
      }
    ];

    it('should return sorted trips by cost when using CheapestSortStrategy', async () => {
      mockApiClient.getTripsByQuery.mockResolvedValueOnce(mockBizAwayTrips);

      const trips = await repository.byQuery(
        IATA3.MAD,
        IATA3.BCN,
        new CheapestSortStrategy()
      );

      expect(trips).toHaveLength(2);
      expect(trips[0].cost).toBe(100);
      expect(trips[1].cost).toBe(150);
      expect(mockApiClient.getTripsByQuery).toHaveBeenCalledWith(IATA3.MAD, IATA3.BCN);
    });

    it('should return sorted trips by duration when using FastestSortStrategy', async () => {
      mockApiClient.getTripsByQuery.mockResolvedValueOnce(mockBizAwayTrips);

      const trips = await repository.byQuery(
        IATA3.MAD,
        IATA3.BCN,
        new FastestSortStrategy()
      );

      expect(trips).toHaveLength(2);
      expect(trips[0].duration).toBe(90);
      expect(trips[1].duration).toBe(120);
      expect(mockApiClient.getTripsByQuery).toHaveBeenCalledWith(IATA3.MAD, IATA3.BCN);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockApiClient.getTripsByQuery.mockRejectedValueOnce(error);

      await expect(repository.byQuery(
        IATA3.MAD,
        IATA3.BCN,
        new CheapestSortStrategy()
      )).rejects.toThrow('API Error');
    });
  });

  describe('all', () => {
    const mockBizAwayTrips: BizAwayTrip[] = [
      {
        id: '1',
        origin: IATA3.MAD,
        destination: IATA3.BCN,
        cost: 100,
        duration: 120,
        type: 'train',
        display_name: 'Madrid - Barcelona'
      }
    ];

    it('should return all trips', async () => {
      mockApiClient.getAllTrips.mockResolvedValueOnce(mockBizAwayTrips);

      const trips = await repository.all();

      expect(trips).toHaveLength(1);
      expect(trips[0]).toEqual(
        new Trip(
          '1',
          IATA3.MAD,
          IATA3.BCN,
          100,
          120,
          'train',
          'Madrid - Barcelona'
        )
      );
      expect(mockApiClient.getAllTrips).toHaveBeenCalled();
    });

    it('should handle API errors when fetching all trips', async () => {
      const error = new Error('API Error');
      mockApiClient.getAllTrips.mockRejectedValueOnce(error);

      await expect(repository.all()).rejects.toThrow('API Error');
    });
  });

  describe('save', () => {
    it('should save a trip', async () => {
      const trip = new Trip(
        '1',
        IATA3.MAD,
        IATA3.BCN,
        100,
        120,
        'train',
        'Madrid - Barcelona'
      );

      mockApiClient.saveTrip.mockResolvedValueOnce();

      await repository.save(trip);

      expect(mockApiClient.saveTrip).toHaveBeenCalledWith(trip);
    });

    it('should handle API errors when saving', async () => {
      const trip = new Trip(
        '1',
        IATA3.MAD,
        IATA3.BCN,
        100,
        120,
        'train',
        'Madrid - Barcelona'
      );

      const error = new Error('Save failed');
      mockApiClient.saveTrip.mockRejectedValueOnce(error);

      await expect(repository.save(trip)).rejects.toThrow('Save failed');
    });
  });

  describe('delete', () => {
    it('should delete a trip by id', async () => {
      mockApiClient.deleteTrip.mockResolvedValueOnce();

      await repository.delete('1');

      expect(mockApiClient.deleteTrip).toHaveBeenCalledWith('1');
    });

    it('should handle API errors when deleting', async () => {
      const error = new Error('Delete failed');
      mockApiClient.deleteTrip.mockRejectedValueOnce(error);

      await expect(repository.delete('1')).rejects.toThrow('Delete failed');
    });
  });
}); 