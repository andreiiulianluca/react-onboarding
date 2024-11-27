import { Filters } from "../../contexts/SearchFilterContext";

export default interface FilterButtonProps {
  type: keyof Filters;
  title: string;
  action: (value: string) => void;
}

export type FilterCategories = "gender" | "status" | "species";
