import { FileRepository } from "@fe-files/domain/repository";

export class UploadFileUseCase {
  constructor(private fileRepository: FileRepository) {}

  async execute(file: File) {
    return this.fileRepository.uploadFile(file)
  }
}