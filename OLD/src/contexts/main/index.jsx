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
  elementSelected: null,
  setElementSelected: () => {},
  updateList: () => {},
  addElement: () => {},
  removeElement: () => {},
  toggleElementVisibility: () => {},
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

  const [elementSelected, set_elementSelected] = useState(null);

  const [moveRatio, setMoveRatio] = useState(1);

  const elementListRef = useRef([]);

  // LOAD FROM STORAGE ---------------------------------
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
  }, []);

  // SAVE CONTENT --------------------------------------
  const saveContent = (list) => {
    storage.setItem(STORAGE_KEY_LIST, JSON.stringify({ elementList: list }));
  };

  // SETUP KEYBOARD EVENTS --------------------------------------
  useEffect(() => {
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

  // SELECT / UPDATE / UNSELECT ELEMENT --------------------------------------
  const setElementSelected = (element) => {
    if (elementSelected) {
      const newElementList = [...elementList].map((element) => {
        if (element.id === elementSelected.id) {
          return { ...elementSelected };
        }
        return element;
      });
      setElementList(newElementList);
      saveContent(newElementList);
    }
    set_elementSelected(element);
  };

  // ADD ELEMENT --------------------------------------
  const addElement = (element) => {
    const newElementList = [...elementList, element];
    setElementList(newElementList);
    setElementSelected(element);
  };

  // TOGGLE VISIBILITY ELEMENT --------------------------------------
  const toggleElementVisibility = (elementId) => {
    const newElementList = [...elementList].map((oldElement) => {
      if (oldElement.id === elementId) {
        const elem =
          oldElement[portadaSizeId] ||
          ELEMENT_TYPES[oldElement?.type]?.defaultValue;

        return {
          ...oldElement,
          [portadaSizeId]: {
            ...elem,
            visible: !elem.visible,
          },
        };
      }
      return oldElement;
    });
    setElementList(newElementList);
    saveContent(newElementList);
  };

  // MOVE UP-DOWN ELEMENT --------------------------------------
  const moveUpDownElement = (index, dir) => {
    const newElementList = moveElement(elementList, index, index + dir);
    setElementList(newElementList);
    saveContent(newElementList);
  };

  // REMOVE ELEMENT --------------------------------------
  const removeElement = (id) => {
    const newElementList = [...elementList].filter(
      (element) => element.id !== id
    );
    set_elementSelected(null);
    setElementList(newElementList);
    saveContent(newElementList);
  };

  // DUPLICATE ELEMENT --------------------------------------
  const duplicateElement = (id) => {
    const newElementList = [];
    [...elementList].forEach((element) => {
      newElementList.push(element);
      if (element.id === id) {
        newElementList.push({ ...element, id: getUUID() + "_d" });
      }
    });
    setElementList(newElementList);
    saveContent(newElementList);
  };

  // UPDATE LIST --------------------------------------
  const updateList = (updatedList) => {
    setElementList(updatedList);
    saveContent(updatedList);
    set_elementSelected(null);
  };

  // IMAGE POOL --------------------------------------
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

  // PORTADA SIZE ID --------------------------------------
  const setPortadaSizeId = (id) => {
    set_portadaSizeId(id);
    storage.setItem(STORAGE_KEY_PORTADA_ID, id);
  };

  return (
    <MainContext.Provider
      value={{
        portadaSizeId,
        setPortadaSizeId,
        moveRatio,
        elementList,
        elementSelected,
        setElementSelected,
        updateList,
        addElement,
        removeElement,
        toggleElementVisibility,
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
