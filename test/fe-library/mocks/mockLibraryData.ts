import {
  IAddLibraryForm,
  IUpdateLibraryForm,
  Library,
} from '@/modules/fe-library/domain/entities/Library';
import { PaginationItems } from '@/modules/fe-library/domain/entities/Pagination';

export const mockLibrary: Library = {
  id: '5160c0a4-f8c7-40ec-a77b-a6eac686ad4c',
  library: '1-800 FLOWERS.COM, Inc.',
  version: 'Other Specialty Stores',
  description: 'Shoes',
  type: 'NASDAQ',
  license: 'CZ90 6227 5116 8014 9846 9414',
  link: 'https://foxnews.com',
  securityState: 'https://shareasale.com',
  createdDate: '2021-09-29',
  createdUser: 'John Doe',
  updatedUser: 'John Doe',
};

export const mockLibraryParamsAdd: IAddLibraryForm = {
  library: '1-800 FLOWERS.COM, Inc.',
  version: 'Other Specialty Stores',
  description: 'Shoes',
  type: 'NASDAQ',
  license: 'CZ90 6227 5116 8014 9846 9414',
  link: 'https://foxnews.com',
  securityState: 'https://shareasale.com',
  createdUser: 'John Doe',
};

export const mockLibraryParamsUpdate: IUpdateLibraryForm = {
  library: '1-800 FLOWERS.COM, Inc.',
  id: '5160c0a4-f8c7-40ec-a77b-a6eac686ad4c',
  version: 'Other Specialty Stores',
  type: 'NASDAQ',
  license: 'CZ90 6227 5116 8014 9846 9414',
  link: 'https://foxnews.com',
  securityState: 'https://shareasale.com',
  updatedUser: 'John Doe',
};

export const idMock = '5160c0a4-f8c7-40ec-a77b-a6eac686ad4c';

export const paginationParamsMock = { page: 1, pageSize: 10 };

export const mockDataPaginated: PaginationItems<Library> = {
  items: [mockLibrary],
  totalItems: 1,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  message: 'Librerías obtenidas',
  status: 'success',
};
