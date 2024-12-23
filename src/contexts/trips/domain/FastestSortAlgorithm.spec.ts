import { FastestSortAlgorithm } from './FastestSortAlgorithm';
import { Trip } from './Trip';

describe('FastestSortAlgorithm', () => {
  let sortAlgorithm: FastestSortAlgorithm;

  beforeAll(() => {
    sortAlgorithm = new FastestSortAlgorithm();
  });

  it('should sort trips by duration in ascending order', () => {
    const trips = [
      { cost: 300, duration: 180 } as Trip,
      { cost: 200, duration: 90 } as Trip,
      { cost: 100, duration: 120 } as Trip,
    ];

    const sortedTrips = sortAlgorithm.sort(trips);

    expect(sortedTrips).toEqual([
      { cost: 200, duration: 90 } as Trip,
      { cost: 100, duration: 120 } as Trip,
      { cost: 300, duration: 180 } as Trip,
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

  it('should maintain order of trips with equal durations', () => {
    const trips = [
      { cost: 300, duration: 120 } as Trip,
      { cost: 200, duration: 120 } as Trip,
      { cost: 100, duration: 90 } as Trip,
    ];

    const sortedTrips = sortAlgorithm.sort(trips);

    expect(sortedTrips).toEqual([
      { cost: 100, duration: 90 } as Trip,
      { cost: 300, duration: 120 } as Trip,
      { cost: 200, duration: 120 } as Trip,
    ]);
  });
}); 