import { AddLibraryForm, IAddLibraryForm } from "@/modules/fe-library/domain/entities";
import { LibraryRepository } from "@/modules/fe-library/domain/repository";


export class AddLibraryUseCase {
  constructor(private libraryRepository: LibraryRepository) {}

  async execute(library: IAddLibraryForm) {

    const libraryData = new AddLibraryForm(library);
    libraryData.validate();
    return this.libraryRepository.addLibrary(library);
  }
}
