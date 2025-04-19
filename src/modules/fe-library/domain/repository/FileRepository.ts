export interface FileRepository {
    uploadFile(file: File): Promise<any>;
    downloadFile(): Promise<{file:Blob,fileName:string}>;
    }