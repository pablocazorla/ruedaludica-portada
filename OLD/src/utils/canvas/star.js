import { DEG_TO_RAD } from "@/config/constants";
import ELEMENT_TYPES from "@/config/elementTypes";

const renderStar = (ctx, ops) => {
  var cfg = Object.assign(
    {},
    {
      ...ELEMENT_TYPES.star.defaultValue,
    },
    ops || {}
  );

  var rot = cfg.rotation * DEG_TO_RAD;
  var sid = 2 * cfg.sides;

  ctx.save();

  if (cfg.opacity < 1) {
    ctx.globalAlpha = cfg.opacity;
  }
  let hasFill = false;

  if (cfg.color) {
    ctx.fillStyle = cfg.color;
    hasFill = true;
  }

  ctx.beginPath();
  ctx.moveTo(
    cfg.x + cfg.radius * Math.cos(rot),
    cfg.y + cfg.radius * Math.sin(rot)
  );

  var is_r = 2;

  for (var i = 1; i <= sid; i += 1) {
    if (is_r === 1) {
      ctx.lineTo(
        cfg.x + cfg.radius * Math.cos(rot + (i * 2 * Math.PI) / sid),
        cfg.y + cfg.radius * Math.sin(rot + (i * 2 * Math.PI) / sid)
      );
      is_r = 2;
    } else {
      ctx.lineTo(
        cfg.x + cfg.radius2 * Math.cos(rot + (i * 2 * Math.PI) / sid),
        cfg.y + cfg.radius2 * Math.sin(rot + (i * 2 * Math.PI) / sid)
      );
      is_r = 1;
    }
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

export default renderStar;
