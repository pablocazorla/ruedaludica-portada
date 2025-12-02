import type { Element } from "./element";

export interface Context {
  elementList: Element[];
  elementSelected: Element | null;
  setElementSelected: (element: Element | null) => void;
}
