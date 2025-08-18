import { PORTADA_SIZE } from "@/config/constants";
import { useEffect, useRef, useContext } from "react";
import Nav from "@/components/nav";
import { MainContext } from "@/contexts/main";
import renderCanvas from "@/utils/canvas/renderCanvas";

const tabList = Object.values(PORTADA_SIZE).map(
  ({ title, type: value, width, height }) => {
    return {
      text: `${title} (${width} x ${height} px)`,
      value,
    };
  }
);

const Screen = () => {
  const canvasNode = useRef(null);

  const {
    elementList,
    imagePool,
    imagesLoaded,
    portadaSizeId,
    setPortadaSizeId,
  } = useContext(MainContext);

  useEffect(() => {
    if (imagesLoaded) {
      renderCanvas(canvasNode.current, elementList, imagePool, portadaSizeId);
    }
  }, [elementList, imagePool, imagesLoaded, portadaSizeId]);

  const { width, height } = PORTADA_SIZE[portadaSizeId];

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
        <canvas
          width={width}
          height={height}
          className="block bg-black w-full h-full shadow-[0_0_0_1px_#000]"
          ref={canvasNode}
        />
      </div>
    </div>
  );
};

export default Screen;
