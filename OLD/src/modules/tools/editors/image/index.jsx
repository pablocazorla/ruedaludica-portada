import InputNumber from "@/components/inputs/number";
import Switch from "@/components/inputs/switch";
import InputText from "@/components/inputs/text";
import Textarea from "@/components/inputs/textarea";
import ELEMENT_TYPES from "@/config/elementTypes";
import UploadWidget from "@/components/uploader";

const ImageTool = ({ element, onChange }) => {
  const {
    url,
    name,
    x,
    y,
    scale,
    opacity,
    crop,
    show_crop,
    x_crop,
    y_crop,
    width_crop,
    height_crop,
    blur,
    shadow,
  } = {
    ...ELEMENT_TYPES.image.defaultValue,
    ...element,
  };

  return (
    <>
      <UploadWidget name="url" onChange={onChange} />
      <InputText label="url" value={url} name="url" onChange={onChange} />
      <Textarea
        label="name"
        value={name}
        name="name"
        onChange={onChange}
        classNameInput="h-6 resize-none rounded"
      />
      <div className="flex items-center gap-3">
        <InputNumber label="x" value={x} name="x" onChange={onChange} />
        <InputNumber label="y" value={y} name="y" onChange={onChange} />
        <InputNumber
          label="scale"
          value={scale}
          name="scale"
          onChange={onChange}
          min={0}
          step={0.005}
        />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <InputNumber
          label="blur"
          value={blur}
          name="blur"
          onChange={onChange}
          min={0}
          className="w-[60px]"
        />
        <InputNumber
          label="opacity"
          value={opacity}
          name="opacity"
          onChange={onChange}
          min={0}
          max={1}
          step={0.05}
          className="w-[70px]"
        />

        <InputText
          label="shadow"
          value={shadow}
          name="shadow"
          onChange={onChange}
        />
      </div>
      <div className="">
        <Switch label="recortar" value={crop} name="crop" onChange={onChange} />
      </div>
      {crop ? (
        <div className="border-t border-white/30 border-dashed pt-3 mt-3">
          <h3 className="font-bold text-sm mb-3">Recortar:</h3>
          <div className="flex items-center gap-3">
            <InputNumber
              label="x image"
              value={x_crop}
              name="x_crop"
              onChange={onChange}
            />
            <InputNumber
              label="y image"
              value={y_crop}
              name="y_crop"
              onChange={onChange}
            />
            <Switch
              label="mostrar recorte"
              value={show_crop}
              name="show_crop"
              onChange={onChange}
            />
          </div>
          <div className="flex items-center gap-3">
            <InputNumber
              label="width"
              value={width_crop}
              name="width_crop"
              onChange={onChange}
            />
            <InputNumber
              label="height"
              value={height_crop}
              name="height_crop"
              onChange={onChange}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export const ImageLoader = ({ element, onChange }) => {
  const { url } = element;

  return (
    <>
      <div className="flex gap-5">
        <div className="">
          <div className="w-[250px] aspect-square border border-gray-800">
            <img src={url} className="object-contain w-full h-full" />
          </div>
        </div>
        <div className="flex-1">
          <ImageTool element={element} onChange={onChange} />
        </div>
      </div>
    </>
  );
};

export default ImageTool;
