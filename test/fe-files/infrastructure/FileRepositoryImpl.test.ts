import axios from 'axios';
import { FileRepositoryImpl } from '@/modules/fe-files/infrastructure/repository/FileRepositoryImpl';
import {
  OCP_APIM_SUBSCRIPTION_KEY,
  BASE_APLICATION_UX_URL,
} from '@/lib/config/environments';
import { mockBlob, mockFile } from '../mocks/mockFilesData';


jest.mock('axios');

describe('FileRepositoryImpl', () => {
  let fileRepository: FileRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn((key) => {
          if (key === 'accessToken') {
            return 'mockAccessToken';
          }
          return null;
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    fileRepository = new FileRepositoryImpl('mockAccessToken');
  });

  describe('uploadFile', () => {
    it('debería subir un archivo exitosamente', async () => {
      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
        data: { status: 'success', message: 'Archivo subido correctamente' },
      });

      const result = await fileRepository.uploadFile(mockFile);

      expect(axios.post).toHaveBeenCalledWith(
        `${BASE_APLICATION_UX_URL}/files`,
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
          },
        },
      );

      const formData = new FormData();
      formData.append('file', mockFile);
      expect(axios.post).toHaveBeenCalledWith(
        `${BASE_APLICATION_UX_URL}/files`,
        expect.objectContaining({
          get: expect.any(Function),
        }),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
          },
        },
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Archivo subido correctamente',
      });
    });

    it('debería lanzar un error si la subida del archivo falla', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const mockFile = new File(['mock content'], 'mockFile.txt', {
        type: 'text/plain',
        lastModified: Date.now(),
      });

      (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(
        new Error('Error al subir'),
      );

      await expect(fileRepository.uploadFile(mockFile)).rejects.toThrow(
        'Error subiendo el archivo',
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('downloadFile', () => {
    it('debería descargar un archivo exitosamente', async () => {
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
        data: mockBlob,
        headers: {
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        },
      });

      const result = await fileRepository.downloadFile();

      expect(axios.get).toHaveBeenCalledWith(
        `${BASE_APLICATION_UX_URL}/files/download-latest`,
        {
          responseType: 'blob',
          headers: {
            'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
          },
        },
      );
      expect(result).toEqual({
        file: mockBlob,
        fileName: 'archivo_descargado.pdf',
      });
    });

    it('debería lanzar un error si la descarga del archivo falla', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
        new Error('Error al descargar'),
      );

      await expect(fileRepository.downloadFile()).rejects.toThrow(
        'Error descargando el archivo',
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
