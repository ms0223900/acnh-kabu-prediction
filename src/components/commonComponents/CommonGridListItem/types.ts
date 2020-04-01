import { ReactNode, ReactNodeArray } from "react";
import { GridRatio } from "common-types";

export interface CommonGridListItemWrapperProps {
  children: ReactNodeArray
  widthRatios: GridRatio[]
}