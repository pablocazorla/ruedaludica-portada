import type { Element } from "@/models/element";

export const renderImage = (
  ctx: CanvasRenderingContext2D,
  element: Element
  //imagePool: HTMLImageElement[]
) => {
  ctx.fillStyle = element.color || "#000";
  ctx.fillRect(
    element.x || 0,
    element.y || 0,
    element.width || 0,
    element.height || 0
  );
};
