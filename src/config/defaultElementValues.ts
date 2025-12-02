const base = {
  name: "$$$-$",
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  scale: 1,
  rotation: 0,
  color: "#000000",
  borderWidth: 0,
  borderColor: "#000000",
  shadow: "",
  blur: 0,
  opacity: 1,
};

const DEFAULT_ELEMENT_VALUES = {
  image: {
    ...base,
    img: "",
  },
  text: {
    ...base,
    text: "",
    fontSize: 90,
    lineHeight: 1.4,
    bold: false,
    italic: false,
    uppercase: false,
    underline: false,
    textAlign: "left",
    fontFamily: "sans-serif",
  },
  rect: {
    ...base,
    radius: 0,
  },
  circle: {
    ...base,
    radius: 20,
    height: 0,
  },
};

export const defaultElementValues = {
  ...DEFAULT_ELEMENT_VALUES.image,
  ...DEFAULT_ELEMENT_VALUES.text,
  ...DEFAULT_ELEMENT_VALUES.rect,
};

export const allKeys = Object.keys({
  ...DEFAULT_ELEMENT_VALUES.image,
  ...DEFAULT_ELEMENT_VALUES.text,
  ...DEFAULT_ELEMENT_VALUES.rect,
  ...DEFAULT_ELEMENT_VALUES.circle,
  clip: "",
});

export const keyTypeNumbers = [
  "x",
  "y",
  "width",
  "height",
  "scale",
  "rotation",
  "borderWidth",
  "blur",
  "opacity",
  "fontSize",
  "lineHeight",
  "radius",
];
export const keyTypeColors = ["color", "borderColor"];

export const keyTypeBooleans = ["bold", "italic", "uppercase", "underline"];

export default DEFAULT_ELEMENT_VALUES;
