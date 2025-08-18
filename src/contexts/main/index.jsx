import storage from "@/utils/storage";
import { createContext, useEffect, useRef, useState } from "react";
import moveElement from "@/utils/moveElement";
import { PORTADA_SIZE } from "@/config/constants";
import getUUID from "@/utils/getUUID";

const portadaSizeIdDefault = Object.keys(PORTADA_SIZE)[0];

const STORAGE_KEY_LIST = "LIST";
const STORAGE_KEY_PORTADA_ID = "PORTADA_ID";

export const MainContext = createContext({
  portadaSizeId: portadaSizeIdDefault,
  setPortadaSizeId: () => {},
  moveRatio: 1,
  elementList: [],
  updateList: () => {},
  addElement: () => {},
  removeElement: () => {},
  updateElement: () => {},
  moveUpDownElement: () => {},
  removeElement: () => {},
  duplicateElement: () => {},
  imagePool: { current: {} },
  imagesLoaded: false,
  saveContent: () => {},
});

export const MainContextProvider = ({ children }) => {
  const [portadaSizeId, set_portadaSizeId] = useState(portadaSizeIdDefault);
  const [elementList, setElementList] = useState([]);

  const [moveRatio, setMoveRatio] = useState(1);

  const elementListRef = useRef([]);

  useEffect(() => {
    const storedValueList = storage.getItem(STORAGE_KEY_LIST);
    if (storedValueList) {
      const storeList = JSON.parse(storedValueList);
      elementListRef.current = storeList.elementList;
      setElementList(storeList.elementList);
    }
    //
    const storedValuePortadaId = storage.getItem(STORAGE_KEY_PORTADA_ID);
    if (storedValuePortadaId) {
      set_portadaSizeId(storedValuePortadaId);
    }
    //

    let isMoveRatioHigher = false;

    const changeMoveRatioToHigh = (e) => {
      if (e.key === "Shift" && !isMoveRatioHigher) {
        isMoveRatioHigher = true;
        setMoveRatio(10);
      }
    };

    const changeMoveRatioToNormal = (e) => {
      if (e.key === "Shift" && isMoveRatioHigher) {
        isMoveRatioHigher = false;
        setMoveRatio(1);
      }
    };

    window.addEventListener("keydown", changeMoveRatioToHigh);
    window.addEventListener("keyup", changeMoveRatioToNormal);

    return () => {
      window.removeEventListener("keydown", changeMoveRatioToHigh);
      window.removeEventListener("keyup", changeMoveRatioToNormal);
    };
  }, []);

  const addElement = (element) => {
    setElementList((oldElementList) => {
      const newElementList = [...oldElementList, element];
      // storage.setItem(
      //   STORAGE_KEY_LIST,
      //   JSON.stringify({ elementList: newElementList })
      // );
      elementListRef.current = newElementList;
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
      // storage.setItem(
      //   STORAGE_KEY_LIST,
      //   JSON.stringify({ elementList: newElementList })
      // );
      elementListRef.current = newElementList;
      return newElementList;
    });
  };

  const moveUpDownElement = (index, dir) => {
    setElementList((oldElementList) => {
      const newElementList = moveElement(oldElementList, index, index + dir);
      // storage.setItem(
      //   STORAGE_KEY_LIST,
      //   JSON.stringify({ elementList: newElementList })
      // );
      elementListRef.current = newElementList;
      return newElementList;
    });
  };

  const removeElement = (id) => {
    setElementList((oldElementList) => {
      const newElementList = [...oldElementList].filter(
        (element) => element.id !== id
      );
      // storage.setItem(
      //   STORAGE_KEY_LIST,
      //   JSON.stringify({ elementList: newElementList })
      // );
      elementListRef.current = newElementList;
      return newElementList;
    });
  };

  const updateList = (updatedList) => {
    setElementList(updatedList);
    // storage.setItem(
    //   STORAGE_KEY_LIST,
    //   JSON.stringify({ elementList: updatedList })
    // );
    elementListRef.current = updatedList;
  };

  const duplicateElement = (id) => {
    setElementList((oldElementList) => {
      const newElementList = [];

      [...oldElementList].forEach((element) => {
        newElementList.push(element);
        if (element.id === id) {
          newElementList.push({ ...element, id: getUUID() + "_d" });
        }
      });
      // storage.setItem(
      //   STORAGE_KEY_LIST,
      //   JSON.stringify({ elementList: newElementList })
      // );
      elementListRef.current = newElementList;
      return newElementList;
    });
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

    imageList.forEach((element) => {
      const { url, idImage } = element[portadaSizeId] || {
        url: null,
        idImage: null,
      };
      if (!url || !idImage) {
        return;
      }
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
  }, [elementList, portadaSizeId]);

  const setPortadaSizeId = (id) => {
    set_portadaSizeId(id);
    storage.setItem(STORAGE_KEY_PORTADA_ID, id);
  };

  const saveContent = () => {
    // storage.setItem(
    //   STORAGE_KEY_LIST,
    //   JSON.stringify({ elementList: elementListRef.current })
    // );
  };

  useEffect(() => {
    let count = 1;

    const saveContentStorage = () => {
      if (elementListRef.current) {
        console.log(`Guardando nº ${count++}`);
        storage.setItem(
          STORAGE_KEY_LIST,
          JSON.stringify({ elementList: elementListRef.current })
        );
      }
    };

    let timer = setInterval(() => {
      saveContentStorage();
    }, 20000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <MainContext.Provider
      value={{
        portadaSizeId,
        setPortadaSizeId,
        moveRatio,
        elementList,
        updateList,
        addElement,
        removeElement,
        updateElement,
        moveUpDownElement,
        removeElement,
        duplicateElement,
        imagePool,
        imagesLoaded,
        saveContent,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
