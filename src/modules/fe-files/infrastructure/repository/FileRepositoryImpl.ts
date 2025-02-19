import axios from 'axios';

import {
  BASE_APLICATION_UX_URL,
  OCP_APIM_SUBSCRIPTION_KEY,
} from '@/lib/config/environments';
import { FileRepository } from '../../domain/repository/FileRepository';

export class FileRepositoryImpl implements FileRepository {
  private baseUrl: string = BASE_APLICATION_UX_URL;
  constructor(accessToken: string) {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${this.baseUrl}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error subiendo el archivo');
    }
  }
  async downloadFile(): Promise<{file:Blob,fileName:string}> {
    const url = `${this.baseUrl}/files/download-latest`;
    try {
      const response = await axios.get(url,{
        responseType: 'blob',
        headers: {
          'Ocp-Apim-Subscription-Key': OCP_APIM_SUBSCRIPTION_KEY,
        }
      })
      const file = response.data;
      return { file, fileName: response.headers['content-disposition']?.split('attachment; filename=')[1] || 'archivo_descargado.pdf' };
    } catch (error: any) {
      throw new Error('Error descargando el archivo');
    }
  }
}
