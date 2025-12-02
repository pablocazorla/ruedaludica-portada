import type { Element } from "@/models/element";
import {
  defaultElementValues,
  allKeys,
  keyTypeNumbers,
  keyTypeBooleans,
  keyTypeColors,
} from "@/config/defaultElementValues";

const keysToExclude = ["id", "visible"];

const elementAdapter = {
  toString: (element: Element | null): string => {
    if (!element) {
      return "";
    }
    const arr = Object.entries(element);
    return arr
      .map(([key, value]) => {
        if (keysToExclude.includes(key)) {
          return null;
        }
        return `${key}: ${value}`;
      })
      .filter((item) => item !== null)
      .join("\n");
  },
  toElement: (element: Element | null, str: string): Element | null => {
    if (!element) {
      return null;
    }
    const arr = str.split("\n");
    const obj: any = {};
    arr.forEach((item) => {
      const [key, value] = item.split(":");
      if (!key || !value) {
        return;
      }
      if (!allKeys.includes(key)) {
        return;
      }
      if (keyTypeNumbers.includes(key)) {
        const num = Number(value.trim());
        if (isNaN(num)) {
          obj[key.trim()] = element[key.trim() as keyof Element];
          return;
        }
        obj[key.trim()] = num;
        return;
      }
      if (keyTypeBooleans.includes(key)) {
        obj[key.trim()] = value.trim() === "true";
        return;
      }
      if (keyTypeColors.includes(key)) {
        const color = value.trim();
        if (!color.startsWith("#")) {
          obj[key.trim()] = element[key.trim() as keyof Element];
          return;
        }
        obj[key.trim()] = color;
        return;
      }
      obj[key.trim()] = value.trim();
    });
    const elementToReturn = {
      id: element.id,
      visible: element.visible,
      ...obj,
    };

    Object.entries(elementToReturn).forEach(([k, v]) => {
      if (defaultElementValues[k as keyof typeof defaultElementValues] === v) {
        delete elementToReturn[k as keyof Element];
      }
    });

    return elementToReturn;
  },
};

export default elementAdapter;
