import { IUpdateLibraryForm, UpdateLibraryForm } from '@/modules/fe-library/domain/entities';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';

export class UpdateLibraryUseCase {
  constructor(private libraryRepository: LibraryRepository) {}

  async execute(library:IUpdateLibraryForm ) {
    const libraryData = new UpdateLibraryForm(library);
    libraryData.validate();
    return this.libraryRepository.updateLibrary(library);
  }
}
