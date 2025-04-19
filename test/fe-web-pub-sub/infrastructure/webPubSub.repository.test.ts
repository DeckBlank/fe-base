import axios from 'axios';
import { BASE_APLICATION_API } from '@/config/environments';
import { WebPubSubRepositoryImpl } from '@/modules/fe-web-pub-sub/services/webPubSub.repository';
import { ResponseAPI } from '@/modules/fe-app/domain/entities/ResponseAPI';

jest.mock('axios');

describe('WebPubSubRepositoryImpl', () => {
  let repository: WebPubSubRepositoryImpl;
  const mockAccessToken = 'mockAccessToken';
  const mockResponse: ResponseAPI<{ url: string }> = {
    status: 'success',
    message: 'URL de WebPubSub obtenida',
    data: { url: 'http://mockurl.com' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new WebPubSubRepositoryImpl(mockAccessToken);
  });

  describe('getWebPubSubUrl', () => {
    it('debería devolver la URL de WebPubSub correctamente', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockResolvedValue({
        data: mockResponse,
      });

      const result = await repository.getWebPubSubUrl();

      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_API}/web-pub-sub/url-connection`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('debería devolver un error si la obtención de la URL falla', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockRejectedValue(new Error('Error de conexión'));

      const result = await repository.getWebPubSubUrl();

      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_API}/web-pub-sub/url-connection`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual({
        status: 'error',
        message: 'Error al obtener la url de conexión.',
      });
    });
  });
});
