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
  gender: ["female", "male", "genderless", "unknown"],
  status: ["Alive", "Dead", "Unknown"],
};

const filterCategories: {
  title: string;
  type: keyof typeof filterOptions;
}[] = [
  {
    title: "Gender",
    type: "gender",
  },
  {
    title: "Status",
    type: "status",
  },
  {
    title: "Species",
    type: "species",
  },
];

export { filterOptions, filterCategories };
