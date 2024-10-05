export type TReact = {
  isDelete?: boolean;
  userId: string;
};

export enum TPostCategory {
  WebDevelopment = "Web Development",
  SoftwareEngineering = "Software Engineering",
  AI = "Artificial Intelligence",
  DataScience = "Data Science",
  Cybersecurity = "Cybersecurity",
  MobileAppDevelopment = "Mobile App Development",
  CloudComputing = "Cloud Computing",
  DevOps = "DevOps",
  MachineLearning = "Machine Learning",
  BlockchainTechnology = "Blockchain Technology",
}

export type TPost = {
  _id: string;
  userId?: string;
  category: TPostCategory;
  description: string;
  premium: boolean;
  images?: string[]|undefined;
  react?: TReact[];
  isDelete?: boolean;
  comments?: string[];
};
