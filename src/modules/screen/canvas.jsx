import { PORTADA_SIZE } from "@/config/constants";
import { useEffect, useRef, useContext } from "react";
import { MainContext } from "@/contexts/main";
import renderCanvas from "@/utils/canvas/renderCanvas";
import { cx } from "@/utils/cx";

const Canvas = ({ list, className, isBase }) => {
  const canvasNode = useRef(null);

  const { imagePool, imagesLoaded, portadaSizeId } = useContext(MainContext);

  useEffect(() => {
    if (imagesLoaded) {
      renderCanvas(canvasNode.current, list, imagePool, portadaSizeId, isBase);
    }
  }, [list, imagePool, imagesLoaded, portadaSizeId, isBase]);

  const { width, height } = PORTADA_SIZE[portadaSizeId];

  return (
    <canvas
      width={width}
      height={height}
      className={cx("block  w-full h-full ", className)}
      ref={canvasNode}
    />
  );
};

export default Canvas;
