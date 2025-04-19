export interface Library {
  id: string;
  library: string;
  version: string;
  description: string;
  type: string;
  license: string;
  link: string;
  securityState: string;
  createdDate: string;
  createdUser: string;
  updatedUser: string;
}
interface IAddLibraryForm
  extends Pick<
    Library,
    | 'library'
    | 'version'
    | 'description'
    | 'type'
    | 'license'
    | 'link'
    | 'securityState'
  > {
  version: Library['version'];
  type: Library['type'];
  license: Library['license'];
  link: Library['link'];
  securityState: Library['securityState'];
  createdUser: string;
}
interface IUpdateLibraryForm
  extends Pick<
    Library,
    'id' | 'version' | 'type' | 'license' | 'link' | 'securityState'
  > {
  library: Library['library'];
  version: Library['version'];
  type: Library['type'];
  license: Library['license'];
  link: Library['link'];
  securityState: Library['securityState'];
  updatedUser?: string;
}

export type { IAddLibraryForm, IUpdateLibraryForm };
