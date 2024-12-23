import { CheapestSortAlgorithm } from './CheapestSortAlgorithm';
import { Trip } from './Trip';

describe('CheapestSortAlgorithm', () => {
  let sortAlgorithm: CheapestSortAlgorithm;

  beforeAll(() => {
    sortAlgorithm = new CheapestSortAlgorithm();
  });

  it('should sort trips by cost in ascending order', () => {
    const trips = [
      { cost: 400, duration: 120 } as Trip,
      { cost: 100, duration: 180 } as Trip,
      { cost: 300, duration: 120 } as Trip,
      { cost: 200, duration: 150 } as Trip,
    ];

    const sortedTrips = sortAlgorithm.sort(trips);

    expect(sortedTrips).toEqual([
      { cost: 100, duration: 180 } as Trip,
      { cost: 200, duration: 150 } as Trip,
      { cost: 300, duration: 120 } as Trip,
      { cost: 400, duration: 120 } as Trip,
    ]);
  });

  it('should handle empty array', () => {
    const trips: Trip[] = [];

    const sortedTrips = sortAlgorithm.sort(trips);

    expect(sortedTrips).toEqual([]);
  });

  it('should handle array with single trip', () => {
    const trips = [{ cost: 100, duration: 120 } as Trip];

    const sortedTrips = sortAlgorithm.sort(trips);

    expect(sortedTrips).toEqual([{ cost: 100, duration: 120 } as Trip]);
  });

  it('should maintain order of trips with equal costs', () => {
    const trips = [
      { cost: 200, duration: 120 } as Trip,
      { cost: 200, duration: 150 } as Trip,
      { cost: 100, duration: 180 } as Trip,
    ];

    const sortedTrips = sortAlgorithm.sort(trips);

    expect(sortedTrips).toEqual([
      { cost: 100, duration: 180 } as Trip,
      { cost: 200, duration: 120 } as Trip,
      { cost: 200, duration: 150 } as Trip,
    ]);
  });
}); 