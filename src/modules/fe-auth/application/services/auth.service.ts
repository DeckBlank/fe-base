import axios from 'axios';
import {
  BASE_APLICATION_UX_URL,
  OCP_APIM_SUBSCRIPTION_KEY,
} from '@/lib/config/environments';
import { IAuthService } from '@fe-auth/domain/service';
import { IAuthServiceLoginParams } from '@fe-auth/domain/interfaces';

export class AuthService implements IAuthService {
  private baseUrl: string = BASE_APLICATION_UX_URL;
  constructor(accessToken: string) {
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
        'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
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
}
