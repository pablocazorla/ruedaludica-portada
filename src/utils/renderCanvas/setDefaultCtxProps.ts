import type { Element } from "@/models/element";

const angleToRad = Math.PI / 180;

export const setDefaultCtxProps = (
  ctx: CanvasRenderingContext2D,
  element: Element
) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(element.x || 0, element.y || 0);
  ctx.rotate((element.rotation || 0) * angleToRad);
  ctx.scale(element.scale || 1, element.scale || 1);
  // opacity
  ctx.globalAlpha = typeof element.opacity === "number" ? element.opacity : 1;
  //
  if (element.shadow) {
    var arrShadow = element.shadow.split(" ");
    if (arrShadow[0]) ctx.shadowOffsetX = parseInt(arrShadow[0], 10);
    if (arrShadow[1]) ctx.shadowOffsetY = parseInt(arrShadow[1], 10);
    if (arrShadow[2]) ctx.shadowBlur = parseInt(arrShadow[2], 10);
    if (arrShadow[3]) ctx.shadowColor = arrShadow[3];
  } else {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "#000";
  }
  if (element.blur && element.blur > 0) {
    ctx.filter = `blur(${element.blur}px)`;
  } else {
    ctx.filter = "blur(0px)";
  }
};
