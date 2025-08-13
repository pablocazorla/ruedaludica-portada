import InputColor from "@/components/inputs/color";
import InputNumber from "@/components/inputs/number";
import InputText from "@/components/inputs/text";

export const PolygonLabel = ({ element }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="font-bold">Polígono:</div>
      <div
        className="h-3 w-4 border-8 border-t-0"
        style={{ borderColor: `transparent transparent ${element.color}` }}
      ></div>
    </div>
  );
};

const PolygonTool = ({ element, onChange }) => {
  const {
    x,
    y,
    sides,
    size,
    color,
    borderColor,
    borderWidth,
    rotation,
    opacity,
    shadow,
  } = element;

  return (
    <div className="">
      <div className="flex items-center gap-3">
        <InputNumber label="x" value={x} name="x" onChange={onChange} />
        <InputNumber label="y" value={y} name="y" onChange={onChange} />
      </div>
      <div className="flex items-center gap-3">
        <InputNumber
          label="sides"
          value={sides}
          name="sides"
          onChange={onChange}
          min={3}
        />
        <InputNumber
          label="Lado"
          value={size}
          name="size"
          onChange={onChange}
          min={5}
        />
        <InputNumber
          label="rotation"
          value={rotation}
          name="rotation"
          onChange={onChange}
        />
      </div>
      <div className="flex items-center gap-3">
        <InputColor
          label="Color"
          value={color}
          name="color"
          onChange={onChange}
        />
        <InputNumber
          label="opacity"
          value={opacity}
          name="opacity"
          onChange={onChange}
          min={0}
          max={1}
          step={0.05}
        />
        <InputText
          label="shadow"
          value={shadow}
          name="shadow"
          onChange={onChange}
        />
      </div>
      <div className="flex items-center gap-3">
        <InputNumber
          label="border Width"
          value={borderWidth}
          name="borderWidth"
          onChange={onChange}
          min={0}
        />
        <InputColor
          label="border Color"
          value={borderColor}
          name="borderColor"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PolygonTool;
