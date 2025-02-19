import axios from 'axios';
import { LibraryRepositoryImpl } from '@/modules/fe-library/infrastructure/repository';
import {
  PaginationItems,
  Library,
  ResponseAPI,
} from '@/modules/fe-library/domain/entities';
import {
  idMock,
  mockDataPaginated,
  mockLibrary,
  mockLibraryParamsAdd,
  mockLibraryParamsUpdate,
  paginationParamsMock,
} from '../mocks/mockLibraryData';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';
import {
  GetLibraryByIdUseCase,
  GetPaginatedLibrariesUseCase,
} from '@/modules/fe-library/application/useCases';
import {
  BASE_APLICATION_UX_URL,
  OCP_APIM_SUBSCRIPTION_KEY,
} from '@/lib/config/environments';

jest.mock('axios');

describe('LibraryRepositoryImpl', () => {
  let repository: LibraryRepository;
  let getLibrariesUseCase: GetPaginatedLibrariesUseCase;
  let getLibraryById: GetLibraryByIdUseCase;
  const mockData: ResponseAPI<Library> = {
    status: 'success',
    message: 'Librería obtenida',
    data: mockLibrary,
  };
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
    repository = new LibraryRepositoryImpl('mockAccessToken');
    getLibrariesUseCase = new GetPaginatedLibrariesUseCase(repository);
    getLibraryById = new GetLibraryByIdUseCase(repository);
  });

  describe('getPaginatedLibraries', () => {
    it('debería devolver librerías paginadas', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockResolvedValue({
        data: mockDataPaginated,
      });
      const resultUseCase =
        await getLibrariesUseCase.execute(paginationParamsMock);
      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_UX_URL}/library`,
        params: paginationParamsMock,
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        },
        method: 'GET',
      });
      expect(resultUseCase).toEqual(mockDataPaginated);
    });

    it('debería lanzar un error si la obtención de librerías falla', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockRejectedValue(
        new Error(),
      );
      await expect(
        repository.getPaginatedLibraries(paginationParamsMock),
      ).rejects.toThrow('No se encontro respuesta');
    });
  });

  describe('getLibraryById', () => {
    it('debería devolver una librería por ID', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockResolvedValue({
        data: mockData,
      });
      const result = await getLibraryById.execute(idMock);
      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_UX_URL}/library/${idMock}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        },
      });
      expect(result).toEqual(mockData);
    });

    it('debería devolver una respuesta de error si la obtención de la librería falla', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockRejectedValue(
        new Error(),
      );
      await expect(
        repository.getPaginatedLibraries(paginationParamsMock),
      ).rejects.toThrow('No se encontro respuesta');
    });
  });

  describe('addLibrary', () => {
    it('debería agregar una librería exitosamente', async () => {
      (axios.post as jest.MockedFunction<typeof axios>).mockResolvedValue({
        data: mockData,
      });

      const result = await repository.addLibrary(mockLibraryParamsAdd);
      expect(axios.post).toHaveBeenCalledWith(
        `${BASE_APLICATION_UX_URL}/library`,
        mockLibraryParamsAdd,
        {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
          },
        },
      );
      expect(result).toEqual(mockData);
    });

    it('debería devolver una respuesta de error si agregar la librería falla', async () => {
      (axios.post as jest.MockedFunction<typeof axios>).mockRejectedValueOnce(
        new Error('Error al agregar'),
      );

      const result = await repository.addLibrary(mockLibraryParamsAdd);
      expect(result).toEqual({
        status: 'error',
        message: 'Error al agregar la librería.',
      });
    });
  });

  describe('updateLibrary', () => {
    it('debería actualizar una librería exitosamente', async () => {
      const mockData: ResponseAPI<Library> = {
        status: 'success',
        message: 'Librería actualizada',
        data: mockLibrary,
      };

      (axios as jest.MockedFunction<typeof axios>).mockResolvedValueOnce({
        data: mockData,
      });

      const result = await repository.updateLibrary(mockLibraryParamsUpdate);
      expect(axios).toHaveBeenCalledWith({
        url: `${BASE_APLICATION_UX_URL}/library`,
        method: 'put',
        data: mockLibraryParamsUpdate,
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        },
      });
      expect(result).toEqual(mockData);
    });

    it('debería devolver una respuesta de error si la actualización de la librería falla', async () => {
      (axios as jest.MockedFunction<typeof axios>).mockRejectedValueOnce(
        new Error('Error al actualizar'),
      );

      const result = await repository.updateLibrary(mockLibraryParamsUpdate);
      expect(result).toEqual({
        status: 'error',
        message: 'Error al actualizar la librería.',
      });
    });
  });
});
