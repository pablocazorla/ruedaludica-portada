import type { Element } from "@/models/element";
import DEFAULT_ELEMENT_VALUES from "@/config/defaultElementValues";
import { setDefaultCtxProps } from "./setDefaultCtxProps";

export const renderRect = (
  ctx: CanvasRenderingContext2D,
  element: Element,
  clip: boolean = false
) => {
  const cfgElement: Element = {
    ...DEFAULT_ELEMENT_VALUES.rect,
    ...element,
  };

  setDefaultCtxProps(ctx, cfgElement);

  ctx.fillStyle = cfgElement.color || "#000";

  ctx.beginPath();
  ctx.roundRect(
    0,
    0,
    cfgElement.width || 0,
    cfgElement.height || 0,
    cfgElement.radius || 0
  );
  ctx.closePath();

  if (clip) {
    ctx.clip();
  } else {
    ctx.fill();
    if (cfgElement.borderWidth && cfgElement.borderWidth > 0) {
      ctx.strokeStyle = cfgElement.borderColor || "#000";
      ctx.lineWidth = cfgElement.borderWidth || 0;
      ctx.stroke();
    }
  }
};
