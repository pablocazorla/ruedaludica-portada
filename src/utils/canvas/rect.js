import ELEMENT_TYPES from "@/config/elementTypes";

const renderRect = (ctx, ops) => {
  var cfg = Object.assign(
    {},
    {
      ...ELEMENT_TYPES.rect.defaultValue,
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
  if (cfg.radius === 0) {
    ctx.rect(cfg.x, cfg.y, cfg.width, cfg.height);
  } else {
    ctx.moveTo(cfg.x + cfg.radius, cfg.y);
    ctx.lineTo(cfg.x + cfg.width - cfg.radius, cfg.y);
    ctx.quadraticCurveTo(
      cfg.x + cfg.width,
      cfg.y,
      cfg.x + cfg.width,
      cfg.y + cfg.radius
    );
    ctx.lineTo(cfg.x + cfg.width, cfg.y + cfg.height - cfg.radius);
    ctx.quadraticCurveTo(
      cfg.x + cfg.width,
      cfg.y + cfg.height,
      cfg.x + cfg.width - cfg.radius,
      cfg.y + cfg.height
    );
    ctx.lineTo(cfg.x + cfg.radius, cfg.y + cfg.height);
    ctx.quadraticCurveTo(
      cfg.x,
      cfg.y + cfg.height,
      cfg.x,
      cfg.y + cfg.height - cfg.radius
    );
    ctx.lineTo(cfg.x, cfg.y + cfg.radius);
    ctx.quadraticCurveTo(cfg.x, cfg.y, cfg.x + cfg.radius, cfg.y);
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

export default renderRect;
