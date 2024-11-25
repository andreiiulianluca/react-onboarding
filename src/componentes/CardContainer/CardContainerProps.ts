export enum ScrollTypes {
  NORMAL = "normal",
  INFINITY = "infinity",
}

export interface CardContainerProps {
  page: string;
  type: ScrollTypes;
  characters: {
    id: number;
    image: string;
    name: string;
    location: { name: string; url: string };
    status: string;
  }[];
  isLoading: boolean;
  error: string | null;
  action: any;
}
