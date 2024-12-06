type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  location: { name: string; url: string };
};

type Filters = {
  gender?: string;
  species?: string;
  status?: string;
};

export type { Character, Filters };
