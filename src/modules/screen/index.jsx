import { PORTADA_WIDTH, PORTADA_HEIGHT } from "@/config/constants";
import { useEffect, useRef, useContext, useState, useCallback } from "react";
import { MainContext } from "@/contexts/main";
import renderCanvas from "@/utils/canvas/renderCanvas";
import InputText from "@/components/inputs/text";

const Screen = () => {
  const canvasNode = useRef(null);

  const downloadCanvas = useCallback((_, name) => {
    const canvas = canvasNode.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${name}.png`;
    link.href = dataURL;
    link.click();
  }, []);

  const { elementList, imagePool, imagesLoaded } = useContext(MainContext);

  useEffect(() => {
    if (imagesLoaded) {
      renderCanvas(canvasNode.current, elementList, imagePool);
    }
  }, [elementList, imagePool, imagesLoaded]);

  return (
    <div className="flex-1 h-screen grid place-content-center overflow-hidden">
      <div className="px-[100px] pt-[30px] pb-[60px] max-h-screen relative">
        <div className="text-center text-xs pt-2 absolute top-0 left-0 w-full">
          {`${PORTADA_WIDTH} x ${PORTADA_HEIGHT} px`}
        </div>
        <canvas
          width={PORTADA_WIDTH}
          height={PORTADA_HEIGHT}
          className="block bg-black w-full h-full shadow-[0_0_0_1px_#000]"
          ref={canvasNode}
        />
        <div className="flex justify-center absolute bottom-0 left-0 w-full">
          <div className="">
            <InputText
              label="Descargar"
              value="portada"
              onChange={downloadCanvas}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;
