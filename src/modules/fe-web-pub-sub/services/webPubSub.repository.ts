import axios from 'axios';

import {
  BASE_APLICATION_API,
} from '@/config/environments';
import { ResponseAPI } from '../domain/entities/ResponseAPI';
import { IwebPubSubRepository } from '../domain/repository/IwebPubSub.repository';


export class WebPubSubRepositoryImpl implements IwebPubSubRepository {
  private baseUrl: string = BASE_APLICATION_API;
  constructor(accessToken: string) {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  async getWebPubSubUrl(): Promise<ResponseAPI<{ url: string }>> {
    const options = {
      url: `${this.baseUrl}/web-pub-sub/url-connection`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios(options);
      return response.data as ResponseAPI<{ url: string }>;
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al obtener la url de conexión.',
      };
    }
  }
}
