import ELEMENT_TYPES from "@/config/elementTypes";

const renderCircle = (ctx, ops) => {
  var cfg = Object.assign(
    {},
    {
      ...ELEMENT_TYPES.circle.defaultValue,
    },
    ops || {}
  );
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
  ctx.arc(cfg.x, cfg.y, cfg.radius, 0, 2 * Math.PI);
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

export default renderCircle;
