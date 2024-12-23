import { IATA3 } from "@bizaway/contexts";
import { ApiClient } from "./api-client";

describe('Api tests', () => {
  let apiClient: ApiClient;

  beforeAll(async () => {
    apiClient = await ApiClient.new();
  });

  afterAll(async () => {
    await apiClient.close();
  });

  async function createTrip() {
    const response = await apiClient.createTrip({
      origin: IATA3.AMS,
      destination: IATA3.BCN,
      cost: 100,
      duration: 100,
      type: 'flight',
      display_name: 'test',
    });
    return response;
  }

  it('should return trips by origin and destination, sorted by cheapest', async () => {
    const response = await apiClient.getTrips(IATA3.AMS, IATA3.BCN, 'cheapest');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].cost).toBeLessThanOrEqual(response.body[1].cost);
  });

  it('should return trips by origin and destination, sorted by fastest', async () => {
    const response = await apiClient.getTrips(IATA3.AMS, IATA3.BCN, 'fastest');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].duration).toBeLessThanOrEqual(response.body[1].duration);
  });

  it('should return all trips', async () => {
    await createTrip();
    await createTrip();
    await createTrip();
    const response = await apiClient.getAllTrips();
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should create a trip', async () => {
    const response = await createTrip();
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
  });

  it('should delete a trip', async () => {
    const trip = await createTrip();
    const tripsSize = await apiClient.getAllTrips();

    const response = await apiClient.deleteTrip(trip.body.id);

    expect(response.status).toBe(200);

    const tripsSizeAfterDelete = await apiClient.getAllTrips();

    expect(tripsSizeAfterDelete.body.length).toBe(tripsSize.body.length - 1);
  });
});
