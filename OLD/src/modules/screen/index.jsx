import { PORTADA_SIZE } from "@/config/constants";
import { useContext, useMemo } from "react";
import Nav from "@/components/nav";
import { MainContext } from "@/contexts/main";
import Canvas from "./canvas";

const tabList = Object.values(PORTADA_SIZE).map(
  ({ title, type: value, width, height }) => {
    return {
      text: `${title} (${width} x ${height} px)`,
      value,
    };
  }
);

const Screen = () => {
  const {
    elementSelected,
    setElementSelected,
    elementList,
    portadaSizeId,
    setPortadaSizeId,
  } = useContext(MainContext);

  const idSelected = useMemo(() => {
    return elementSelected?.id || null;
  }, [elementSelected]);

  const [elementsPrev, elementsPost] = useMemo(() => {
    if (!idSelected) {
      return [elementList, []];
    }

    const elemPrev = [];
    const elemPost = [];
    let isPrev = true;

    elementList.forEach((element) => {
      if (element.id === idSelected) {
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
  }, [elementList, idSelected]);

  return (
    <div className="flex-1 h-screen grid place-content-center overflow-hidden select-none">
      <div className="px-[100px] py-[45px] max-h-screen relative">
        <div className="flex justify-center pt-1 absolute top-0 left-0 w-full">
          <Nav
            tabList={tabList}
            currentTab={portadaSizeId}
            setCurrentTab={setPortadaSizeId}
            className="mb-5 text-xs"
          />
        </div>
        <div
          className="relative w-full h-full"
          onClick={() => {
            setElementSelected(null);
          }}
        >
          <Canvas
            list={elementsPrev}
            className="bg-black shadow-[0_0_0_1px_#000]"
            isBase
          />
          {elementSelected ? (
            <Canvas
              list={[elementSelected]}
              className="absolute top-0 left-0"
            />
          ) : null}
          {elementsPost.length > 0 ? (
            <Canvas list={elementsPost} className="absolute top-0 left-0" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Screen;
