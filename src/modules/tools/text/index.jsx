import InputColor from "@/components/inputs/color";
import InputNumber from "@/components/inputs/number";
import Select from "@/components/inputs/select";
import Switch from "@/components/inputs/switch";
import InputText from "@/components/inputs/text";
import Textarea from "@/components/inputs/textarea";
import { FONT_FAMILIES, FONT_WEIGHTS, TEXT_ALIGNS } from "@/config/constants";

export const TextLabel = ({ element }) => {
  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="font-bold">Texto:</div>
      <div className="h-5 overflow-hidden opacity-40">{element.text}</div>
    </div>
  );
};

const TextTool = ({ element, onChange }) => {
  const {
    text,
    x,
    y,
    width,
    color,
    fontSize,
    lineHeight,
    fontFamily,
    bold,
    italic,
    textAlign,
    uppercase,
    shadow,
  } = element;

  return (
    <div className="">
      <Textarea label="Texto" value={text} name="text" onChange={onChange} />
      <div className="flex items-center gap-3">
        <InputNumber label="x" value={x} name="x" onChange={onChange} />
        <InputNumber label="y" value={y} name="y" onChange={onChange} />
        <InputNumber
          label="width"
          value={width}
          name="width"
          onChange={onChange}
          min={10}
        />
      </div>
      <div className="flex items-center gap-3">
        <Select
          label="Font Family"
          name="fontFamily"
          value={fontFamily}
          options={FONT_FAMILIES}
          onChange={onChange}
        />
        <InputNumber
          label="font size"
          value={fontSize}
          name="fontSize"
          onChange={onChange}
          min={0}
        />
        <InputColor
          label="Color"
          value={color}
          name="color"
          onChange={onChange}
        />
      </div>
      <div className="flex items-center gap-3">
        <InputNumber
          label="line Height"
          value={lineHeight}
          name="lineHeight"
          onChange={onChange}
          step={0.1}
          min={0}
        />
        <Select
          label="Font Weight"
          name="bold"
          value={bold}
          options={FONT_WEIGHTS}
          onChange={onChange}
        />
        <Select
          label="Text Align"
          name="textAlign"
          value={textAlign}
          options={TEXT_ALIGNS}
          onChange={onChange}
        />
      </div>
      <div className="flex items-center gap-6">
        <Switch
          label="Italic"
          name="italic"
          value={italic}
          onChange={onChange}
        />
        <Switch
          label="Uppercase"
          name="uppercase"
          value={uppercase}
          onChange={onChange}
        />
      </div>
      <div className="flex items-center gap-6">
        <InputText
          label="shadow"
          value={shadow}
          name="shadow"
          onChange={onChange}
        />
      </div>
      {/* <InputText label={"Texto"} value={"Lorem"} onChange={() => {}} />
      
      <InputNumber label={"Texto"} value={89745} onChange={() => {}} />
      
      
       */}
    </div>
  );
};

export default TextTool;
