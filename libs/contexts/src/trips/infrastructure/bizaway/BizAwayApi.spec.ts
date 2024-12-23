import axios from 'axios';
import { BizAwayApi } from './BizAwayApi';
import { IATA3 } from '../../domain';
import { BizAwayTrip } from './BizAwayTrip';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BizAwayApi', () => {
  const API_KEY = 'test-api-key';
  const BASE_URL = 'https://g0qw7e7p0d.execute-api.eu-west-1.amazonaws.com/default/trips';
  let api: BizAwayApi;

  beforeEach(() => {
    api = new BizAwayApi(BASE_URL, API_KEY);
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
}); 