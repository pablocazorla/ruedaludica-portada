import InputColor from "@/components/inputs/color";
import InputNumber from "@/components/inputs/number";
import InputText from "@/components/inputs/text";

const RectTool = ({ element, onChange }) => {
  const {
    x,
    y,
    width,
    height,
    color,
    borderColor,
    borderWidth,
    radius,
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
          label="width"
          value={width}
          name="width"
          onChange={onChange}
          min={10}
        />
        <InputNumber
          label="height"
          value={height}
          name="height"
          onChange={onChange}
          min={10}
        />
        <InputNumber
          label="radius"
          value={radius}
          name="radius"
          onChange={onChange}
          min={0}
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
      <div className="flex items-center gap-3"></div>
    </div>
  );
};

export default RectTool;
