import { PORTADA_SIZE } from "@/config/constants";
import ELEMENT_TYPES from "@/config/elementTypes";
import renderText from "./text";
import renderRect from "./rect";
import renderCircle from "./circle";
import renderPolygon from "./polygon";
import renderStar from "./star";
import renderImage from "./image";

const renderCanvas = (canvas, elementList, imagePool, portadaSizeId) => {
  const ctx = canvas.getContext("2d");
  const portadaSize = PORTADA_SIZE[portadaSizeId];
  ctx.fillRect(0, 0, portadaSize.width, portadaSize.height);

  elementList.forEach((element) => {
    const elem =
      element[portadaSizeId] || ELEMENT_TYPES[element.type].defaultValue;
    if (!elem.visible) {
      return;
    }
    switch (element.type) {
      case "text":
        renderText(ctx, elem);
        break;
      case "rect":
        renderRect(ctx, elem);
        break;
      case "image":
        renderImage(ctx, elem, imagePool);
        break;
      case "circle":
        renderCircle(ctx, elem);
        break;
      case "polygon":
        renderPolygon(ctx, elem);
        break;
      case "star":
        renderStar(ctx, elem);
        break;
      default:
        break;
    }
  });
};

export default renderCanvas;
