import React, { createContext, useContext, useState, ReactNode } from "react";

export type Filters = {
  gender: string | null;
  species: string | null;
  status: string | null;
};

type SearchFilterContextType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filters: Filters;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
};

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(
  undefined
);

interface SearchFilterProviderProps {
  children: ReactNode;
}

export const SearchFilterProvider = ({
  children,
}: SearchFilterProviderProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilter] = useState<Filters>({
    gender: null,
    species: null,
    status: null,
  });

  return (
    <SearchFilterContext.Provider
      value={{ searchTerm, setSearchTerm, filters, setFilter }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};

export const useSearchFilterContext = (): SearchFilterContextType => {
  const context = useContext(SearchFilterContext);
  if (!context) {
    throw new Error(
      "useSearchFilterContext must be used within a SearchFilterProvider"
    );
  }
  return context;
};
