import { FileRepository } from "../../domain/repository/FileRepository";

export class DownloadFileUseCase {
    constructor(private fileRepository: FileRepository) {}
    async execute() {
        return this.fileRepository.downloadFile();
    }
}