import { DownloadFileUseCase } from '@/modules/fe-files/application/useCases';
import { FileRepository } from '@/modules/fe-files/domain/repository';


class MockFileRepository implements FileRepository {
  downloadFile = jest.fn();
  uploadFile(file: File): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

describe('DownloadFileUseCase', () => {
  let downloadFileUseCase: DownloadFileUseCase;
  let mockFileRepository: MockFileRepository;

  const mockFileResponse = {
    status: 'success',
    message: 'Archivo descargado exitosamente',
    data: { fileContent: 'contenidoMockArchivo' },
  };

  beforeEach(() => {
    mockFileRepository = new MockFileRepository();
    downloadFileUseCase = new DownloadFileUseCase(mockFileRepository);
  });

  it('debería llamar al método downloadFile del repositorio', async () => {
    (mockFileRepository.downloadFile as jest.Mock).mockResolvedValue(mockFileResponse);

    const result = await downloadFileUseCase.execute();

    expect(mockFileRepository.downloadFile).toHaveBeenCalled();
    expect(result).toEqual(mockFileResponse);
  });

  it('debería arrojar un error si downloadFile falla', async () => {
    const mockError = new Error('Fallo en la descarga del archivo');
    (mockFileRepository.downloadFile as jest.Mock).mockRejectedValue(mockError);

    await expect(downloadFileUseCase.execute()).rejects.toThrow('Fallo en la descarga del archivo');
    expect(mockFileRepository.downloadFile).toHaveBeenCalled();
  });
});
