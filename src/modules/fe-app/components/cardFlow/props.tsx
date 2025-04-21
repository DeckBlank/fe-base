import { ReactNode } from "react";
export interface ICardFlow {
  children?: ReactNode;
  title?: string;
  description?: string;
  iconList?: any;
  iconName?: any;
  iconSize?: number;
  bgPrimary?: string;
  bgSecondary?: string;
  url?: any;
  onClick?: () => void;
}
