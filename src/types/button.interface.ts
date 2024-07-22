import { OnlyChildrenProps } from "./children.interface";

export interface ButtonProps extends OnlyChildrenProps {
  onClick?: (e?: any) => void;
  className?: string;
  disabled?: boolean;
}
