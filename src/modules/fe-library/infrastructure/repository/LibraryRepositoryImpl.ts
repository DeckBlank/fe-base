import axios from 'axios';
import { LibraryRepository } from '@/modules/fe-library/domain/repository';
import {
  Library,
  PaginationItems,
  PaginationParams,
  ResponseAPI,
  UpdateLibraryForm,
  IUpdateLibraryForm,
  IAddLibraryForm,
} from '@/modules/fe-library/domain/entities';
import {
  BASE_APLICATION_API,
} from '@/config/environments';

export class LibraryRepositoryImpl implements LibraryRepository {
  private baseUrl: string = BASE_APLICATION_API;
  constructor(accessToken: string) {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  async getPaginatedLibraries(
    params: PaginationParams,
  ): Promise<PaginationItems<Library>> {
    const options = {
      url: `${this.baseUrl}/library`,
      params,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    try {
      const response = await axios(options);
      return response.data as PaginationItems<Library>;
    } catch (error: any) {
      throw new Error(error.message + ': No se encontro respuesta');
    }
  }

  async getLibraryById(id: string): Promise<ResponseAPI<Library>> {
    const options = {
      url: `${this.baseUrl}/library/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios(options);
      return response.data as ResponseAPI<Library>;
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al obtener la librería.',
      };
    }
  }

  async addLibrary(library: IAddLibraryForm): Promise<ResponseAPI<any>> {
    try {
      const response = await axios.post(`${this.baseUrl}/library`, library, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data as ResponseAPI<Library>;
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al agregar la librería.',
      };
    }
  }

  async updateLibrary(library: IUpdateLibraryForm): Promise<ResponseAPI<any>> {
    const options = {
      method: 'put',
      url: `${this.baseUrl}/library`,
      data: library,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const updated = await axios(options);
      return updated.data as ResponseAPI<UpdateLibraryForm>;
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al actualizar la librería.',
      };
    }
  }
  async getWebPubSubUrl(): Promise<ResponseAPI<{ url: string; }>> {
    const options = {
      url: `${this.baseUrl}/web-pub-sub/url-connection`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios(options);
      return response.data as ResponseAPI<{ url: string; }>;
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al obtener la url de conexión.',
      };
    }     
  }
}
