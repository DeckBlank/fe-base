import { IUpdateLibraryForm } from './Library';

export class UpdateLibraryForm implements IUpdateLibraryForm {
  library: string;
  id: string;
  license: string;
  link: string;
  securityState: string;
  type: string;
  version: string;
  updatedUser: string;

  constructor(data: any) {
    this.library = data.library;
    this.id = data.id;
    this.license = data.license;
    this.link = data.link;
    this.securityState = data.securityState;
    this.type = data.type;
    this.version = data.version;
    this.updatedUser = data.updatedUser;
  }

  validate = () => {
    return;
  };
}
UpdateLibraryForm;
