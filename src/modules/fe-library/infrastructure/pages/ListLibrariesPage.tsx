import React, { useEffect, useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/ui/components/ui/pagination';
import { Eye, Pencil } from 'lucide-react';
import {
  PaginationItems,
  PaginationParams,
} from '@fe-library/domain/entities/Pagination';
import { Library } from '@fe-library/domain/entities/Library';
import { Link } from 'react-router-dom';
import {
  selectLibraryPage,
  updateLibraryPage,
} from '@/routes/appRoutes';
import { LibraryRepositoryImpl } from '@fe-library/infrastructure/repository';
import { GetPaginatedLibrariesUseCase } from '@fe-library/application/useCases/GetPaginatedLibrariesUseCase';

import { DownloadFileUseCase } from '@fe-files/application/useCases';
import { UploadFileUseCase } from '@fe-files/application/useCases';
import { useTitle } from '@/modules/fe-base/contexts/titleContext';
import { Input } from '@/ui/components/ui/input';
import { useToast } from '@/ui/components/hooks/use-toast';
import { messageError, messageSuccess } from '@/ui/utils/messages';
import { useAuth } from '@/modules/fe-auth/contexts/authContext';
import { FileRepositoryImpl } from '@fe-files/infrastructure/repository';

const ListLibrariesPage: React.FC = () => {
  const { setTitle } = useTitle();
  const { accessToken, refreshToken } = useAuth();
  const [libraries, setLibraries] = React.useState<PaginationItems<Library>>({
    items: [],
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    cached: false,
    message: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [securityState, setSecurityState] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const libraryApi = new LibraryRepositoryImpl(accessToken || '');
  const getPaginatedLibrariesUseCase = new GetPaginatedLibrariesUseCase(
    libraryApi,
  );
  const { toast } = useToast();
  const getPaginatedLibraries = async (paginationParams: PaginationParams) => {
    try {
      const data = await getPaginatedLibrariesUseCase.execute(paginationParams);
      setLibraries(data);
    } catch (error: any) {
      messageError(error.message, toast);
    }
  };
  useEffect(() => {
    setTitle('LISTAR LIBRERÍAS');
    if (!accessToken) {
      refreshToken();
    }
  }, [useTitle,accessToken,refreshToken]);
  useEffect(() => {
    getPaginatedLibraries({
      page: currentPage,
      pageSize,
      securityState,
      type,
      search,
    });
  }, [currentPage, pageSize, search]);
  const handleChangeSecurityState = (value: string) => {
    setSecurityState(value);
  };
  const handleChangeType = (value: string) => {
    setType(value);
  };
  const handleChangeSearch = (value: string) => {   
    if (value.length > 2 || value.length === 0) setSearch(value);
  };
  const searchByFilters = () => {
    setCurrentPage(1);
    setPageSize(10);
    getPaginatedLibraries({
      page: 1,
      pageSize: 10,
      securityState,
      type,
      search,
    });
    setSecurityState('');
    setType('');
  };
  const fileRepository = new FileRepositoryImpl(accessToken || '');
  const downloadFileUseCase = new DownloadFileUseCase(fileRepository);
  const uploadFileUseCase = new UploadFileUseCase(fileRepository);
  const downloadFile = async () => {
    try {
      const blob = await downloadFileUseCase.execute();
      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob.file);
      element.download = blob.fileName;
      document.body.appendChild(element);
      element.click();
    } catch (error) {
      if (error instanceof Error) messageError(error.message, toast);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      messageError('No file selected', toast);
      return;
    }
    try {
      const data = await uploadFileUseCase.execute(file);
      if (data?.status === 'error') return messageError(data?.message, toast);
      messageSuccess({
        message: data.message,
        toast,
      });
    } catch (error) {
      if (error instanceof Error) messageError(error.message, toast);
    }
  };
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 mb-4 md:mb-0 space-y-4 md:space-y-0 w-full md:w-auto">
          <Select
            onValueChange={handleChangeSecurityState}
            value={securityState}
          >
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder="Seleccionar estado de Seguridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aprobado">Aprobado</SelectItem>
              <SelectItem value="Vulnerable">Vulnerable</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handleChangeType} value={type}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder="Seleccionar tipo de Libreria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Externa">Externa</SelectItem>
              <SelectItem value="Privada">Privada</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-center w-full md:w-auto">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={!(!!securityState||!!type)}
              onClick={searchByFilters}
            >
              Buscar
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto mt-4 md:mt-0">
          <Input
            placeholder="Buscar"
            className="border rounded px-4 py-2 w-full"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 p-2">Librería</th>
              <th className="border border-gray-300 p-2">Versión</th>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Estado Seguridad</th>
              <th className="border border-gray-300 bg-orange-400 p-2">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {libraries.items.length > 0 ? (
              libraries.items.map((library) => (
                <tr key={library.id}>
                  <td className="border border-gray-300 p-2">
                    {library.library}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {library.version}
                  </td>
                  <td className="border border-gray-300 p-2">{library.type}</td>
                  <td className="border border-gray-300 p-2">
                    {library.securityState}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center space-x-4">
                      <Link
                        to={selectLibraryPage.path.replace(':id', library.id)}
                        className="text-green-500"
                      >
                        <Eye size={20} />
                      </Link>
                      <Link
                        to={updateLibraryPage.path.replace(':id', library.id)}
                        className="text-yellow-500"
                      >
                        <Pencil size={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-300 p-2 text-center"
                >
                  No hay Librarias para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row items-start md:space-x-4 mt-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-4 md:mb-0 w-full md:w-auto space-y-4 md:space-y-0">
          <Button
            className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-[150px]"
            onClick={downloadFile}
          >
            Descargar VB
          </Button>

          <label className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-[150px] flex items-center justify-center cursor-pointer">
            Cargar VB
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 w-full">
          <Pagination className="md:flex-1">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                  isActive={currentPage > 1}
                />
              </PaginationItem>
              {libraries.currentPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {libraries.currentPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}
              <PaginationItem>
                <PaginationLink>{libraries.currentPage}</PaginationLink>
              </PaginationItem>
              {libraries.currentPage < libraries.totalPages - 1 && (
                <>
                  {libraries.currentPage < libraries.totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(libraries.totalPages)}
                    >
                      {libraries.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < libraries.totalPages &&
                    setCurrentPage(currentPage + 1)
                  }
                  isActive={currentPage < libraries.totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div
            className={`bg-yellow-500 text-black px-4 py-2 rounded flex items-center md:w-auto `}
          >
            <span className="text-sm mr-2">Consumo de datos:</span>
            <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
              {libraries.cached ? 'Cache Redis' : 'SQL'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListLibrariesPage;
