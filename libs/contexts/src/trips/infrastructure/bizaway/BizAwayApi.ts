
import axios from 'axios';
import { BizAwayTrip } from './BizAwayTrip';

export class BizAwayApi {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getTripsByQuery(origin: string, destination: string): Promise<BizAwayTrip[]> {
    const response = await axios.get(this.baseUrl, {
      headers: {
        'x-api-key': this.apiKey
      },
      params: {
        origin,
        destination,
      }
    });
    return response.data;
  }
}


