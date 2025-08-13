import storage from "@/utils/storage";
import { createContext, useEffect, useRef, useState } from "react";
import moveElement from "@/utils/moveElement";

let t = 0;

export const MainContext = createContext({
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
  const [elementList, setElementList] = useState([]);

  useEffect(() => {
    const storedValue = storage.getItem();
    if (!storedValue) {
      return;
    }

    const store = JSON.parse(storedValue);
    setElementList(store.elementList);
  }, []);

  const addElement = (element) => {
    setElementList((oldElementList) => {
      const newElementList = [...oldElementList, element];
      storage.setItem(JSON.stringify({ elementList: newElementList }));
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
      storage.setItem(JSON.stringify({ elementList: newElementList }));
      return newElementList;
    });
  };

  const moveUpDownElement = (index, dir) => {
    setElementList((oldElementList) => {
      const newElementList = moveElement(oldElementList, index, index + dir);
      storage.setItem(JSON.stringify({ elementList: newElementList }));
      return newElementList;
    });
  };

  const removeElement = (id) => {
    setElementList((oldElementList) => {
      const newElementList = [...oldElementList].filter(
        (element) => element.id !== id
      );
      storage.setItem(JSON.stringify({ elementList: newElementList }));
      return newElementList;
    });
  };

  const updateList = (updatedList) => {
    setElementList(updatedList);
    storage.setItem(JSON.stringify({ elementList: updatedList }));
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

    imageList.forEach(({ url, id }) => {
      if (imagePool.current[id]) {
        countLoaded++;
        return;
      }
      setImagesLoaded(false);
      const img = new Image();
      img.src = url;
      imagePool.current[id] = img;
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

  return (
    <MainContext.Provider
      value={{
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
