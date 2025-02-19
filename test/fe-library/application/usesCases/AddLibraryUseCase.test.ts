
import { AddLibraryUseCase } from '@/modules/fe-library/application/useCases';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';
import { mockLibraryParamsAdd } from '../../mocks/mockLibraryData';

class MockLibraryRepository implements LibraryRepository {
  getLibraries = jest.fn();
  getPaginatedLibraries = jest.fn();
  getLibraryById = jest.fn();
  addLibrary = jest.fn();
  updateLibrary = jest.fn();
  deleteLibrary = jest.fn();
  getWebPubSubUrl = jest.fn();
}

describe('AddLibraryUseCase', () => {
  let addLibraryUseCase: AddLibraryUseCase;
  let mockLibraryRepository: MockLibraryRepository;

  beforeEach(() => {
    mockLibraryRepository = new MockLibraryRepository();
    addLibraryUseCase = new AddLibraryUseCase(mockLibraryRepository);
  });

  it('should call addLibrary on repository with correct data', async () => {
    await addLibraryUseCase.execute(mockLibraryParamsAdd);
    expect(mockLibraryRepository.addLibrary).toHaveBeenCalledWith(mockLibraryParamsAdd);
  });
});
