import {IAddLibraryForm, IUpdateLibraryForm, Library} from "../entities/Library";
import { PaginationItems, PaginationParams } from "../entities/Pagination";
import { ResponseAPI } from "../entities/ResponseAPI";

export interface LibraryRepository {
    getPaginatedLibraries({page, pageSize}:PaginationParams): Promise<PaginationItems<Library>>;
    getLibraryById(id: string): Promise<ResponseAPI<Library>>;
    addLibrary(library: IAddLibraryForm): Promise<ResponseAPI<any>>;
    updateLibrary(library: IUpdateLibraryForm): Promise<ResponseAPI<any>>;
    
}