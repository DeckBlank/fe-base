import axios from 'axios';
import { WebPubSubRepositoryImpl } from '@/modules/fe-web-pub-sub/infrastructure/repository';
import { ResponseAPI } from '@fe-web-pub-sub/domain/entities';
import { OCP_APIM_SUBSCRIPTION_KEY, BASE_APLICATION_UX_URL } from '@/lib/config/environments';

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
        url: `${BASE_APLICATION_UX_URL}/web-pub-sub/url-connection`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('debería devolver un error si la obtención de la URL falla', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockRejectedValue(new Error('Error de conexión'));

      const result = await repository.getWebPubSubUrl();

      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_UX_URL}/web-pub-sub/url-connection`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        },
      });
      expect(result).toEqual({
        status: 'error',
        message: 'Error al obtener la url de conexión.',
      });
    });
  });
});
