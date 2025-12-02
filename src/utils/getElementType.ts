import type { Element } from "@/models/element";

export const getElementType = (element: Element) => {
  if (element.img) {
    return "image";
  }
  if (element.text) {
    return "text";
  }
  if (element.height) {
    return "rect";
  }
  if (element.radius) {
    return "circle";
  }
  return "none";
};
