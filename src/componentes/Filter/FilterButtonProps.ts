import { AppDispatch } from "../../store";

export default interface FilterButtonProps {
  key: number;
  type: string;
  input: string;
  action: (
    input: string
  ) => { type: string; payload: any } | ((dispatch: AppDispatch) => void);
}
