import Canvas from "./canvas";
import { useContext, useMemo } from "react";
import { MainContext } from "@/context";
import type { Element } from "@/models/element";

const Screen = () => {
  const { elementList, elementSelected, setElementSelected } =
    useContext(MainContext);

  const elementSelectedId = useMemo(() => {
    return elementSelected?.id;
  }, [elementSelected]);

  const [elementsPrev, elementsPost]: [Element[], Element[]] = useMemo(() => {
    if (!elementSelected) {
      return [elementList, []];
    }

    const elemPrev: Element[] = [];
    const elemPost: Element[] = [];
    let isPrev = true;

    elementList.forEach((element) => {
      if (element.id === elementSelectedId) {
        isPrev = false;
      } else {
        if (isPrev) {
          elemPrev.push(element);
        } else {
          elemPost.push(element);
        }
      }
    });

    return [elemPrev, elemPost];
  }, [elementList, elementSelectedId]);

  return (
    <div className="flex-1 h-screen grid place-content-center overflow-hidden select-none">
      <div className="px-[100px] py-[45px] max-h-screen relative">
        <div className="flex justify-center pt-1 absolute top-0 left-0 w-full">
          {/* <Nav
            tabList={tabList}
            currentTab={portadaSizeId}
            setCurrentTab={setPortadaSizeId}
            className="mb-5 text-xs"
          /> */}
        </div>
        <div
          className="relative w-full h-full"
          onClick={() => {
            setElementSelected(null);
          }}
        >
          <Canvas
            listOfElements={elementsPrev}
            className="bg-black shadow-[0_0_0_1px_#000]"
            // isBase
          />
          {elementSelected ? (
            <Canvas
              listOfElements={[elementSelected]}
              className="absolute top-0 left-0"
            />
          ) : null}
          {elementsPost.length > 0 ? (
            <Canvas
              listOfElements={elementsPost}
              className="absolute top-0 left-0"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Screen;
