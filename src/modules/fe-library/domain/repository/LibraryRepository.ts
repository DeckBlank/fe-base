import {  IAddLibraryForm, IUpdateLibraryForm} from "../entities";
import {Library, PaginationItems, PaginationParams, ResponseAPI} from "../entities";

export interface LibraryRepository {
    getPaginatedLibraries({page, pageSize}:PaginationParams): Promise<PaginationItems<Library>>;
    getLibraryById(id: string): Promise<ResponseAPI<Library>>;
    addLibrary(library: IAddLibraryForm): Promise<ResponseAPI<any>>;
    updateLibrary(library: IUpdateLibraryForm): Promise<ResponseAPI<any>>;
    
}