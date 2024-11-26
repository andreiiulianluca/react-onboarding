export type ScrollType = "normal" | "infinity";

export interface CardContainerProps {
  type: ScrollType;
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
