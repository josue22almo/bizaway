import axios from 'axios';
import { BizAwayApi } from './BizAwayApi';
import { IATA3, Trip } from '../../domain';
import { BizAwayTrip } from './BizAwayTrip';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BizAwayApi', () => {
  const API_KEY = 'test-api-key';
  const BASE_URL = 'https://g0qw7e7p0d.execute-api.eu-west-1.amazonaws.com/default/trips';
  let api: BizAwayApi;

  beforeEach(() => {
    api = new BizAwayApi(API_KEY);
    jest.clearAllMocks();
  });

  describe('getTripsByQuery', () => {
    const mockTrips: BizAwayTrip[] = [
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

    it('should fetch trips with correct parameters', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockTrips });

      await api.getTripsByQuery(IATA3.MAD, IATA3.BCN);

      expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL, {
        headers: { 'x-api-key': API_KEY },
        params: {
          origin: IATA3.MAD,
          destination: IATA3.BCN
        }
      });
    });

    it('should return trips from API response', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockTrips });

      const result = await api.getTripsByQuery(IATA3.MAD, IATA3.BCN);

      expect(result).toEqual(mockTrips);
    });

    it('should propagate API errors', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(api.getTripsByQuery(IATA3.MAD, IATA3.BCN)).rejects.toThrow('API Error');
    });
  });

  describe('getAllTrips', () => {
    const mockTrips: BizAwayTrip[] = [
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

    it('should fetch all trips with correct headers', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockTrips });

      await api.getAllTrips();

      expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL, {
        headers: { 'x-api-key': API_KEY }
      });
    });

    it('should return all trips from API response', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockTrips });

      const result = await api.getAllTrips();

      expect(result).toEqual(mockTrips);
    });
  });

  describe('saveTrip', () => {
    const trip = new Trip(
      '1',
      IATA3.MAD,
      IATA3.BCN,
      100,
      120,
      'train',
      'Madrid - Barcelona'
    );

    it('should send POST request with correct data', async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: undefined });

      await api.saveTrip(trip);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        BASE_URL,
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
          headers: { 'x-api-key': API_KEY }
        }
      );
    });

    it('should handle API errors during save', async () => {
      const error = new Error('Save failed');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(api.saveTrip(trip)).rejects.toThrow('Save failed');
    });
  });

  describe('deleteTrip', () => {
    it('should send DELETE request with correct ID', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: undefined });

      await api.deleteTrip('1');

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${BASE_URL}/1`,
        {
          headers: { 'x-api-key': API_KEY }
        }
      );
    });

    it('should handle API errors during delete', async () => {
      const error = new Error('Delete failed');
      mockedAxios.delete.mockRejectedValueOnce(error);

      await expect(api.deleteTrip('1')).rejects.toThrow('Delete failed');
    });
  });
}); 