import { OnlyChildrenProps } from "./children.interface";

export interface ButtonProps extends OnlyChildrenProps {
  onClick?: () => void;
  className?: string;
}
