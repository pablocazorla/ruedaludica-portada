import { PORTADA_WIDTH, PORTADA_HEIGHT } from "@/config/constants";

import renderText from "./text";
import renderRect from "./rect";
import renderCircle from "./circle";
import renderPolygon from "./polygon";
import renderStar from "./star";
import renderImage from "./image";

const renderCanvas = (canvas, elementList, imagePool) => {
  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, PORTADA_WIDTH, PORTADA_HEIGHT);

  elementList.forEach((element) => {
    if (!element.visible) {
      return;
    }
    switch (element.type) {
      case "text":
        renderText(ctx, element);
        break;
      case "rect":
        renderRect(ctx, element);
        break;
      case "image":
        renderImage(ctx, element, imagePool);
        break;
      case "circle":
        renderCircle(ctx, element);
        break;
      case "polygon":
        renderPolygon(ctx, element);
        break;
      case "star":
        renderStar(ctx, element);
        break;
      default:
        break;
    }
  });
};

export default renderCanvas;
