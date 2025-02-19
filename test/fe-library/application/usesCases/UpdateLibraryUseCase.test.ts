import { UpdateLibraryUseCase } from '@/modules/fe-library/application/useCases';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';
import { Library, ResponseAPI } from '@/modules/fe-library/domain/entities';
import { mockLibrary } from '../../mocks/mockLibraryData';


class MockLibraryRepository implements LibraryRepository {
  getLibraries = jest.fn();
  getPaginatedLibraries = jest.fn();
  getLibraryById = jest.fn();
  addLibrary = jest.fn();
  updateLibrary = jest.fn();
  deleteLibrary = jest.fn();
  getWebPubSubUrl = jest.fn();
}

describe('UpdateLibraryUseCase', () => {
  let updateLibraryUseCase: UpdateLibraryUseCase;
  let mockLibraryRepository: MockLibraryRepository;

  beforeEach(() => {
    mockLibraryRepository = new MockLibraryRepository();
    updateLibraryUseCase = new UpdateLibraryUseCase(mockLibraryRepository);
  });

  it('should update a library', async () => {


    mockLibraryRepository.updateLibrary.mockResolvedValue(undefined);

    await updateLibraryUseCase.execute(mockLibrary);
    expect(mockLibraryRepository.updateLibrary).toHaveBeenCalledWith(mockLibrary);
  });

  it('should handle error when updating a library', async () => {

    mockLibraryRepository.updateLibrary.mockRejectedValue(
      new Error('Error updating library'),
    );

    await expect(updateLibraryUseCase.execute(mockLibrary)).rejects.toThrow(
      'Error updating library',
    );
  });
});
