import { IAddLibraryForm } from "./Library";

export class AddLibraryForm implements IAddLibraryForm {

  description: string;
  library: string;
  license: string;
  link: string;
  securityState: string;
  type: string;
  version: string;
  createdUser: string;

  constructor(data:any){
    this.description = data.description;
    this.library = data.library;
    this.license = data.license;
    this.link = data.link;
    this.securityState = data.securityState;
    this.type = data.type;
    this.version = data.version;
    this.createdUser = data.createdUser
  }

  validate = () => {
    return;
  }

}