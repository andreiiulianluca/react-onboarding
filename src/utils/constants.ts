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
  gender: ["Female", "Male", "Genderless", "Unknown"],
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

const appCategories: {
  link: string;
  title: string;
}[] = [
  {
    title: "Characters",
    link: "/",
  },
  {
    title: "Episode",
    link: "/episode",
  },
  {
    title: "Location",
    link: "/location",
  },
];

export { filterOptions, filterCategories, appCategories };
