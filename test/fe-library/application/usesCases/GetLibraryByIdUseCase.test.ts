import { GetLibraryByIdUseCase } from '@/modules/fe-library/application/useCases';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';
import {Library} from '@/modules/fe-library/domain/entities';
import { idMock, mockLibrary } from '../../mocks/mockLibraryData';

class MockLibraryRepository implements LibraryRepository {
  getLibraries = jest.fn();
  getPaginatedLibraries = jest.fn();
  getLibraryById = jest.fn();
  addLibrary = jest.fn();
  updateLibrary = jest.fn();
  deleteLibrary = jest.fn();
  getWebPubSubUrl = jest.fn();
}

describe('GetLibraryByIdUseCase', () => {
  let getLibraryByIdUseCase: GetLibraryByIdUseCase;
  let mockLibraryRepository: MockLibraryRepository;

  beforeEach(() => {
    mockLibraryRepository = new MockLibraryRepository();
    getLibraryByIdUseCase = new GetLibraryByIdUseCase(mockLibraryRepository);
  });

  it('should return library by id', async () => {


    mockLibraryRepository.getLibraryById.mockResolvedValue(mockLibrary);

    const result = await getLibraryByIdUseCase.execute('1');
    expect(result).toEqual(mockLibrary);
  });

  it('should return null if library not found', async () => {
    mockLibraryRepository.getLibraryById.mockResolvedValue(null);

    const result = await getLibraryByIdUseCase.execute(idMock+'1');
    expect(result).toBeNull();
  });

  it('should handle error when fetching library by id', async () => {
    mockLibraryRepository.getLibraryById.mockRejectedValue(
      new Error('Error fetching library'),
    );

    await expect(getLibraryByIdUseCase.execute(idMock)).rejects.toThrow(
      'Error fetching library',
    );
  });
});
