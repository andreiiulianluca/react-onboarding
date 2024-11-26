import { setGender } from "../store/slices/filter/slice";
import { setStatus } from "../store/slices/filter/slice";
import { setSpecies } from "../store/slices/filter/slice";

const filterOptions = {
  species: [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ],
  genders: ["female", "male", "genderless", "unknown"],
  status: ["Alive", "Dead", "Unknown"],
};

const filterCategories: {
  title: string;
  type: keyof typeof filterOptions;
  action: any;
}[] = [
  {
    title: "Gender",
    type: "genders",
    action: setGender,
  },
  {
    title: "Status",
    type: "status",
    action: setStatus,
  },
  {
    title: "Species",
    type: "species",
    action: setSpecies,
  },
];

export { filterOptions, filterCategories };
