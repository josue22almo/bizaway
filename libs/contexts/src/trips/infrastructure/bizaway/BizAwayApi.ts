
import axios from 'axios';
import { BizAwayTrip } from './BizAwayTrip';
import { Trip } from '../../domain';
import { BizAwayTripVisitor } from './BizAwayTripVisitor';

export class BizAwayApi {
  private readonly baseUrl: string = 'https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips';
  private readonly apiKey: string;

  constructor(apiKey: string) {
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

  async getAllTrips(): Promise<BizAwayTrip[]> {
    const response = await axios.get(this.baseUrl, {
      headers: {
        'x-api-key': this.apiKey
      },
    });
    return response.data;
  }

  async saveTrip(trip: Trip): Promise<void> {
    const visitor = new BizAwayTripVisitor(trip);
    const response = await axios.post(this.baseUrl, visitor.flatten(), {
      headers: {
        'x-api-key': this.apiKey
      }
    });
    return response.data;
  }

  async deleteTrip(id: string): Promise<void> {
    const response = await axios.delete(`${this.baseUrl}/${id}`, {
      headers: {
        'x-api-key': this.apiKey
      }
    });
    return response.data;
  }
}


