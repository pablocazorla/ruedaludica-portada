import { PORTADA_SIZE } from "@/config";
import { cx } from "@/utils/cx";
import type { Element } from "@/models/element";
import { useEffect, useRef } from "react";
import renderCanvas from "@/utils/renderCanvas";
import { useContext } from "react";
import { MainContext } from "@/context";

interface CanvasProps {
  listOfElements: Element[];
  className?: string;
  //isBase?: boolean;
}

const { width, height } = PORTADA_SIZE.youtube;

const Canvas = ({ listOfElements, className }: CanvasProps) => {
  const { elementList } = useContext(MainContext);
  const canvasNode = useRef(null);

  useEffect(() => {
    //if (imagesLoaded) {
    renderCanvas(canvasNode.current, listOfElements, elementList);
    //}
  }, [listOfElements, elementList]);
  return (
    <canvas
      width={width}
      height={height}
      className={cx("block  w-full h-full ", className)}
      ref={canvasNode}
    ></canvas>
  );
};

export default Canvas;
