export interface FilterProps {
  pageNumber: number;
  status: string;
  updatePageNumber: (pageNumber: number) => void;
  updateStatus: (status: string) => void;
  updateGender: (gender: string) => void;
  updateSpecies: (species: string) => void;
}

export enum FilterButtonType {
  GENDER = "gender",
  SPECIES = "species",
  STATUS = "status",
}
