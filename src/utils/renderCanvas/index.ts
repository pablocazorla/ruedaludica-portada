import type { Element } from "@/models/element";
import { getElementType } from "@/utils/getElementType";
import { renderText } from "./renderText";
import { renderImage } from "./renderImage";
import { renderRect } from "./renderRect";
import { renderCircle } from "./renderCircle";

const renderElement = (ctx: CanvasRenderingContext2D, element: Element) => {
  const type = getElementType(element);

  switch (type) {
    case "rect":
      renderRect(ctx, element);
      break;
    case "circle":
      renderCircle(ctx, element);
      break;
    case "text":
      renderText(ctx, element);
      break;
    case "image":
      renderImage(ctx, element);
      break;
    default:
      break;
  }
};

const clipElement = (ctx: CanvasRenderingContext2D, element: Element) => {
  const type = getElementType(element);

  switch (type) {
    case "rect":
      renderRect(ctx, element, true);
      break;
    case "circle":
      renderCircle(ctx, element, true);
      break;
    default:
      break;
  }
};

const renderCanvas = (
  canvasNode: HTMLCanvasElement | null,
  listOfElements: Element[],
  allElementList: Element[]
) => {
  if (!canvasNode) {
    return;
  }

  const ctx = canvasNode.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);

  listOfElements.forEach((element) => {
    if (!element.visible) {
      return;
    }
    ctx.save();
    if (element.clip) {
      const elementClip = allElementList.find((e) => e.name === element.clip);
      if (elementClip) {
        clipElement(ctx, elementClip);
      }
    }
    renderElement(ctx, element);
    ctx.restore();
  });
};

export default renderCanvas;
