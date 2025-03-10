import React, { createContext, useContext, useState, ReactNode } from "react";
import { Filters } from "../types/types";

type SearchFilterContextType = {
  searchTerm: string;
  filters: Filters;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
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
    gender: "",
    species: "",
    status: "",
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
