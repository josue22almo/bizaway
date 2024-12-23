import { IATA3, Trip } from "../../domain";
import { CheapestSortStrategy, FastestSortStrategy } from "../../domain";
import { InMemoryTripsRepository } from "./InMemoryTripsRepository";

describe('InMemoryTripsRepository', () => {
  let repository: InMemoryTripsRepository;

  beforeEach(() => {
    repository = new InMemoryTripsRepository();
  });

  describe('save', () => {
    it('should save a trip', async () => {
      const trip = new Trip(
        '1',
        'MAD' as IATA3,
        'BCN' as IATA3,
        100,
        120,
        'train',
        'Madrid - Barcelona'
      );

      await repository.save(trip);
      const trips = await repository.all();

      expect(trips).toHaveLength(1);
      expect(trips[0]).toEqual(trip);
    });
  });

  describe('delete', () => {
    it('should delete a trip by id', async () => {
      const trip = new Trip(
        '1',
        'MAD' as IATA3,
        'BCN' as IATA3,
        100,
        120,
        'train',
        'Madrid - Barcelona'
      );

      await repository.save(trip);
      await repository.delete('1');
      const trips = await repository.all();

      expect(trips).toHaveLength(0);
    });

    it('should not delete other trips when deleting by id', async () => {
      const trip1 = new Trip(
        '1',
        'MAD' as IATA3,
        'BCN' as IATA3,
        100,
        120,
        'train',
        'Madrid - Barcelona'
      );

      const trip2 = new Trip(
        '2',
        'BCN' as IATA3,
        'MAD' as IATA3,
        150,
        120,
        'train',
        'Barcelona - Madrid'
      );

      await repository.save(trip1);
      await repository.save(trip2);
      await repository.delete('1');
      const trips = await repository.all();

      expect(trips).toHaveLength(1);
      expect(trips[0]).toEqual(trip2);
    });
  });

  describe('byQuery', () => {
    const trip1 = new Trip(
      '1',
      'MAD' as IATA3,
      'BCN' as IATA3,
      100,
      120,
      'train',
      'Madrid - Barcelona'
    );

    const trip2 = new Trip(
      '2',
      'MAD' as IATA3,
      'BCN' as IATA3,
      150,
      90,
      'plane',
      'Madrid - Barcelona'
    );

    const trip3 = new Trip(
      '3',
      'BCN' as IATA3,
      'MAD' as IATA3,
      200,
      150,
      'train',
      'Barcelona - Madrid'
    );

    beforeEach(async () => {
      await repository.save(trip1);
      await repository.save(trip2);
      await repository.save(trip3);
    });

    it('should return trips filtered by origin and destination', async () => {
      const trips = await repository.byQuery(
        'MAD' as IATA3,
        'BCN' as IATA3,
        new CheapestSortStrategy()
      );

      expect(trips).toHaveLength(2);
      expect(trips).toContainEqual(trip1);
      expect(trips).toContainEqual(trip2);
    });

    it('should return empty array when no trips match query', async () => {
      const trips = await repository.byQuery(
        'BCN' as IATA3,
        'VLC' as IATA3,
        new CheapestSortStrategy()
      );

      expect(trips).toHaveLength(0);
    });

    it('should sort trips by cost when using CheapestSortAlgorithm', async () => {
      const trips = await repository.byQuery(
        'MAD' as IATA3,
        'BCN' as IATA3,
        new CheapestSortStrategy()
      );

      expect(trips).toEqual([trip1, trip2]);
    });

    it('should sort trips by duration when using FastestSortAlgorithm', async () => {
      const trips = await repository.byQuery(
        'MAD' as IATA3,
        'BCN' as IATA3,
        new FastestSortStrategy()
      );

      expect(trips).toEqual([trip2, trip1]);
    });
  });

  describe('all', () => {
    it('should return empty array when no trips exist', async () => {
      const trips = await repository.all();
      expect(trips).toHaveLength(0);
    });

    it('should return all saved trips', async () => {
      const trip1 = new Trip(
        '1',
        'MAD' as IATA3,
        'BCN' as IATA3,
        100,
        120,
        'train',
        'Madrid - Barcelona'
      );

      const trip2 = new Trip(
        '2',
        'BCN' as IATA3,
        'MAD' as IATA3,
        150,
        120,
        'train',
        'Barcelona - Madrid'
      );

      await repository.save(trip1);
      await repository.save(trip2);
      const trips = await repository.all();

      expect(trips).toHaveLength(2);
      expect(trips).toContainEqual(trip1);
      expect(trips).toContainEqual(trip2);
    });
  });
}); 