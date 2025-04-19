import axios from 'axios';
import {
  BASE_APLICATION_API,  
} from '@/config/environments';
import { IAuthService } from '../domain/service/IAuth.service';
import { IAuthServiceLoginParams, IBasicLoginParams } from '../domain/interfaces/IAuthServiceLoginParams';

export class AuthService implements IAuthService {
  private baseUrl: string = BASE_APLICATION_API;
  constructor(accessToken?: string) {
    if(accessToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  async login(
    data: IAuthServiceLoginParams
  ): Promise<any> {
    const {userName,email} = data;
    const options = {
      url: `${this.baseUrl}/auth/login`,
      data: {userName,email},
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error: any) {
      return new Error(error.message + ': No se encontro respuesta');
    }
  }
  async basicLogin(
    data: IBasicLoginParams
  ): Promise<any> {
    const {password,email} = data;
    const options = {
      url: `${this.baseUrl}/auth/login`,
      data: {password,email},
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error: any) {
      return new Error(error.message + ': No se encontro respuesta');
    }
  }

  async setAccessToken(accessToken:string): Promise<any> {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
}
