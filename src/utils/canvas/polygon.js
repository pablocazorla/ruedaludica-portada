import { DEG_TO_RAD } from "@/config/constants";
import ELEMENT_TYPES from "@/config/elementTypes";

const renderPolygon = (ctx, ops) => {
  var cfg = Object.assign(
    {},
    {
      ...ELEMENT_TYPES.polygon.defaultValue,
    },
    ops || {}
  );

  var rot = cfg.rotation * DEG_TO_RAD;
  ctx.save();
  if (cfg.opacity < 1) {
    ctx.globalAlpha = cfg.opacity;
  }
  let hasFill = false;

  if (cfg.color) {
    ctx.fillStyle = cfg.color;
    hasFill = true;
  }

  if (cfg.shadow) {
    var arrShadow = cfg.shadow.split(" ");
    if (arrShadow[0]) ctx.shadowOffsetX = parseInt(arrShadow[0], 10);
    if (arrShadow[1]) ctx.shadowOffsetY = parseInt(arrShadow[1], 10);
    if (arrShadow[2]) ctx.shadowBlur = parseInt(arrShadow[2], 10);
    if (arrShadow[3]) ctx.shadowColor = arrShadow[3];
  }

  ctx.beginPath();
  ctx.moveTo(
    cfg.x + cfg.size * Math.cos(rot),
    cfg.y + cfg.size * Math.sin(rot)
  );

  for (var i = 1; i <= cfg.sides; i += 1) {
    ctx.lineTo(
      cfg.x + cfg.size * Math.cos(rot + (i * 2 * Math.PI) / cfg.sides),
      cfg.y + cfg.size * Math.sin(rot + (i * 2 * Math.PI) / cfg.sides)
    );
  }

  ctx.closePath();

  if (hasFill) {
    ctx.fill();
  }
  if (cfg.borderWidth > 0) {
    ctx.strokeStyle = cfg.borderColor;
    ctx.lineWidth = cfg.borderWidth;
    ctx.stroke();
  }
  ctx.restore();
};

export default renderPolygon;
