export const premiumData = [
  {
    name: "Premium",
    value: true,
  },
  {
    name: "Free",
    value: false,
  },
];

const postCategoriesArray = [
  "Web Development",
  "Software Engineering",
  "Artificial Intelligence",
  "Data Science",
  "Cybersecurity",
  "Mobile App Development",
  "Cloud Computing",
  "DevOps",
  "Machine Learning",
  "Blockchain Technology",
] as const;
export const categoryData = postCategoriesArray?.map((item) => ({
  name: item,
  value: item,
}));
