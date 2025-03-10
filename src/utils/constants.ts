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

const EPISODES_TOTAL = 51;
const LOCATIONS_TOTAL = 126;

export {
  filterOptions,
  filterCategories,
  appCategories,
  EPISODES_TOTAL,
  LOCATIONS_TOTAL,
};
