const renderImage = (ctx, ops, imagePool) => {
  const img = imagePool.current[ops?.idImage];

  if (!img) {
    return;
  }

  const { x, y, scale, crop, show_crop, blur, shadow } = ops;

  ctx.save();
  ctx.globalAlpha = ops?.opacity || 1;

  const width = img.width;
  const height = img.height;

  const width_d = width * scale;
  const height_d = height * scale;

  const x_crop = ops?.x_crop || 0;
  const y_crop = ops?.y_crop || 0;
  const width_crop = ops?.width_crop || 300;
  const height_crop = ops?.height_crop || 300;

  if (shadow) {
    var arrShadow = shadow.split(" ");
    if (arrShadow[0]) ctx.shadowOffsetX = parseInt(arrShadow[0], 10);
    if (arrShadow[1]) ctx.shadowOffsetY = parseInt(arrShadow[1], 10);
    if (arrShadow[2]) ctx.shadowBlur = parseInt(arrShadow[2], 10);
    if (arrShadow[3]) ctx.shadowColor = arrShadow[3];

    if (crop) {
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width_crop, y);
      ctx.lineTo(x + width_crop, y + height_crop);
      ctx.lineTo(x, y + height_crop);
      ctx.fill();
      ctx.closePath();
    }
  }

  ctx.save();
  if (crop) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width_crop, y);
    ctx.lineTo(x + width_crop, y + height_crop);
    ctx.lineTo(x, y + height_crop);
    ctx.closePath();
    ctx.clip();
  }

  if (blur > 0) {
    ctx.filter = `blur(${blur}px)`;
  }
  try {
    ctx.drawImage(
      img,
      0,
      0,
      width,
      height,
      x + (crop ? x_crop : 0),
      y + (crop ? y_crop : 0),
      width_d,
      height_d
    );
  } catch (error) {
    console.error(error);
  }

  ctx.restore();
  if (crop && show_crop) {
    ctx.strokeStyle = "#F00";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width_crop, y);
    ctx.lineTo(x + width_crop, y + height_crop);
    ctx.lineTo(x, y + height_crop);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.restore();
};

export default renderImage;
