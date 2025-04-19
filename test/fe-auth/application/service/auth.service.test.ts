import axios from 'axios';

import { IAuthServiceLoginParams } from '@fe-auth/domain/interfaces';
import { BASE_APLICATION_API } from '@/config/environments';
import { AuthService } from '@/modules/fe-auth/services/auth.service';

jest.mock('axios');

describe('AuthService', () => {
  let authService: AuthService;
  const mockAccessToken = 'mockAccessToken';
  const mockResponse = {
    status: 'success',
    message: 'Login exitoso',
    data: { token: 'mockToken' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService(mockAccessToken);
  });

  describe('login', () => {
    const loginParams: IAuthServiceLoginParams = {
      userName: 'testUser',
      email: 'test@example.com',
    };

    it('debería iniciar sesión correctamente y devolver los datos', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockResolvedValue({
        data: mockResponse,
      });

      const result = await authService.login(loginParams);

      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_API}/auth/login`,
        data: loginParams,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      expect(result).toEqual(mockResponse);
    });

    it('debería devolver un error si el login falla', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockRejectedValue(new Error('Error de inicio de sesión'));

      const result = await authService.login(loginParams);

      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_API}/auth/login`,
        data: loginParams,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      expect(result).toEqual(new Error('Error de inicio de sesión: No se encontro respuesta'));
    });
  });
});
