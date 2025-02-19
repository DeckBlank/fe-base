import { GetPaginatedLibrariesUseCase } from '@/modules/fe-library/application/useCases';
import { Library } from '@/modules/fe-library/domain/entities';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';
import { mockLibrary, paginationParamsMock } from '../../mocks/mockLibraryData';

class MockLibraryRepository implements LibraryRepository {
  getLibraries = jest.fn();
  getPaginatedLibraries = jest.fn();
  getLibraryById = jest.fn();
  addLibrary = jest.fn();
  updateLibrary = jest.fn();
  deleteLibrary = jest.fn();
  getWebPubSubUrl = jest.fn();
}

describe('GetPaginatedLibrariesUseCase', () => {
  let getLibrariesUseCase: GetPaginatedLibrariesUseCase;
  let mockLibraryRepository: MockLibraryRepository;

  beforeEach(() => {
    mockLibraryRepository = new MockLibraryRepository();
    getLibrariesUseCase = new GetPaginatedLibrariesUseCase(
      mockLibraryRepository,
    );
  });

  it('debería devolver todas las librerías', async () => {
    mockLibraryRepository.getPaginatedLibraries.mockResolvedValue(mockLibrary);
    const paginationsParams = { page: 1, pageSize: 10 };
    const result = await getLibrariesUseCase.execute(paginationsParams);

    expect(result).toEqual(mockLibrary);
  });

  /*  it('debería manejar un error al obtener las librerías', async () => {
    mockLibraryRepository.getLibraries.mockRejectedValue(
      new Error('Error al obtener las librerías'),
    );
    await expect(getLibrariesUseCase.execute(paginationParamsMock)).rejects.toThrow(
      'Error al obtener las librerías',
    );
  }); */
});
