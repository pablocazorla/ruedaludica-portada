import storage from "@/utils/storage";
import { createContext, useEffect, useRef, useState } from "react";
import moveElement from "@/utils/moveElement";
import { PORTADA_SIZE } from "@/config/constants";

const portadaSizeIdDefault = Object.keys(PORTADA_SIZE)[0];

const STORAGE_KEY_LIST = "LIST";
const STORAGE_KEY_PORTADA_ID = "PORTADA_ID";

export const MainContext = createContext({
  portadaSizeId: portadaSizeIdDefault,
  setPortadaSizeId: () => {},
  elementList: [],
  updateList: () => {},
  addElement: () => {},
  removeElement: () => {},
  updateElement: () => {},
  moveUpDownElement: () => {},
  removeElement: () => {},
  imagePool: { current: {} },
  imagesLoaded: false,
});

export const MainContextProvider = ({ children }) => {
  const [portadaSizeId, set_portadaSizeId] = useState(portadaSizeIdDefault);
  const [elementList, setElementList] = useState([]);

  useEffect(() => {
    const storedValueList = storage.getItem(STORAGE_KEY_LIST);
    if (storedValueList) {
      const storeList = JSON.parse(storedValueList);
      setElementList(storeList.elementList);
    }
    //
    const storedValuePortadaId = storage.getItem(STORAGE_KEY_PORTADA_ID);
    if (storedValuePortadaId) {
      set_portadaSizeId(storedValuePortadaId);
    }
  }, []);

  const addElement = (element) => {
    setElementList((oldElementList) => {
      const newElementList = [...oldElementList, element];
      storage.setItem(
        STORAGE_KEY_LIST,
        JSON.stringify({ elementList: newElementList })
      );
      return newElementList;
    });
  };

  const updateElement = (updatedElement) => {
    setElementList((oldElementList) => {
      const newElementList = [...oldElementList].map((element) => {
        if (element.id === updatedElement.id) {
          return updatedElement;
        }
        return element;
      });
      storage.setItem(
        STORAGE_KEY_LIST,
        JSON.stringify({ elementList: newElementList })
      );
      return newElementList;
    });
  };

  const moveUpDownElement = (index, dir) => {
    setElementList((oldElementList) => {
      const newElementList = moveElement(oldElementList, index, index + dir);
      storage.setItem(
        STORAGE_KEY_LIST,
        JSON.stringify({ elementList: newElementList })
      );
      return newElementList;
    });
  };

  const removeElement = (id) => {
    setElementList((oldElementList) => {
      const newElementList = [...oldElementList].filter(
        (element) => element.id !== id
      );
      storage.setItem(
        STORAGE_KEY_LIST,
        JSON.stringify({ elementList: newElementList })
      );
      return newElementList;
    });
  };

  const updateList = (updatedList) => {
    setElementList(updatedList);
    storage.setItem(
      STORAGE_KEY_LIST,
      JSON.stringify({ elementList: updatedList })
    );
  };

  /////////////////////////

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagePool = useRef({}); //useImages(imageList);

  useEffect(() => {
    const imageList = elementList.filter((element) => element.type === "image");

    if (imageList.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let countLoaded = 0;

    imageList.forEach(({ url, idImage }) => {
      if (imagePool.current[idImage]) {
        countLoaded++;
        return;
      }
      setImagesLoaded(false);
      const img = new Image();
      img.src = url;
      imagePool.current[idImage] = img;
      img.onload = () => {
        countLoaded++;
        if (countLoaded === imageList.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        countLoaded++;
        if (countLoaded === imageList.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [elementList]);

  const setPortadaSizeId = (id) => {
    set_portadaSizeId(id);
    storage.setItem(STORAGE_KEY_PORTADA_ID, id);
  };

  return (
    <MainContext.Provider
      value={{
        portadaSizeId,
        setPortadaSizeId,
        elementList,
        updateList,
        addElement,
        removeElement,
        updateElement,
        moveUpDownElement,
        removeElement,
        imagePool,
        imagesLoaded,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
