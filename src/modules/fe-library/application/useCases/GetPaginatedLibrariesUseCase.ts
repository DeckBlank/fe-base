import {  PaginationParams } from '@/modules/fe-library/domain/entities';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';

export class GetPaginatedLibrariesUseCase {
  constructor(private libraryRepository: LibraryRepository) {}

  async execute(params:PaginationParams) {
    return this.libraryRepository.getPaginatedLibraries(params)
  }
}
