import storage from "@/utils/storage";
import { createContext, useEffect, useRef, useState } from "react";
import { PORTADA_SIZE } from "@/config";
import getUUID from "@/utils/getUUID";
import type { Context } from "@/models/context";
import type { Element } from "@/models/element";

export const MainContext = createContext<Context>({
  elementList: [],
  elementSelected: null,
  setElementSelected: () => {},
});

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const elementsDefault: Element[] = [
    {
      id: getUUID(),
      visible: true,
      x: 0,
      y: 0,
      width: 1900,
      height: 1000,
      color: "#999",
    },
    {
      id: getUUID(),
      visible: true,
      name: "Rect1",
      x: 200,
      y: 200,
      width: 400,
      height: 300,
      scale: 1.3,
      rotation: 10,
      color: "#F00",
      borderWidth: 8,
      borderColor: "#29F",
      shadow: "0 10 10 #000",
      // blur: 10,
      opacity: 1,
      //radius: 40,
    },
    {
      id: getUUID(),
      visible: true,
      x: 300,
      y: 300,
      width: 400,
      height: 300,
      scale: 1,
      rotation: 0,
      color: "#ff0",
      shadow: "-10 0 10 #000",
      blur: 0,
      opacity: 1,
      clip: "Rect1",
    },
  ];
  const [elementList, setElementList] = useState<Element[]>(elementsDefault);

  const [elementSelected, set_elementSelected] = useState<Element | null>(null);

  const setElementSelected = (element: Element | null) => {
    if (elementSelected) {
      setElementList((prev) => {
        const newElementList = [...prev];
        const index = newElementList.findIndex(
          (e) => e.id === elementSelected.id
        );
        if (index > -1) {
          newElementList[index] = elementSelected;
        }
        return newElementList;
      });
    }
    set_elementSelected(element);
  };

  return (
    <MainContext.Provider
      value={{ elementList, elementSelected, setElementSelected }}
    >
      {children}
    </MainContext.Provider>
  );
};
