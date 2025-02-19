import { LibraryRepository } from '@/modules/fe-library/domain/repository';

export class GetLibraryByIdUseCase {
  constructor(private libraryRepository: LibraryRepository) {}

  async execute(id: string) {
    return this.libraryRepository.getLibraryById(id);
  }
}
