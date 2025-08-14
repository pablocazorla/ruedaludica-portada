import { useState, useCallback, useContext } from "react";
import { MainContext } from "@/contexts/main";
import { IconChevronRight } from "@/components/icons/chevronRight";
import TextTool, { TextLabel } from "../text";
import RectTool, { RectLabel } from "../rect";
import ImageTool, { ImageLabel } from "../image";
import CircleTool, { CircleLabel } from "../circle";
import PolygonTool, { PolygonLabel } from "../polygon";
import StarTool, { StarLabel } from "../star";
import { cx } from "@/utils/cx";
import { IconEye } from "@/components/icons/eye";

const Element = ({ element, index }) => {
  const { updateElement, moveUpDownElement, removeElement } =
    useContext(MainContext);

  const { id, type, visible } = element;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onChange = useCallback(
    (name, value) => {
      const idImageChanges =
        name === "url" && element.type === "image"
          ? { idImage: crypto.randomUUID() }
          : {};
      updateElement({
        ...element,
        ...idImageChanges,
        [name]: value,
      });
    },
    [element]
  );

  const lab = (() => {
    switch (type) {
      case "text":
        return <TextLabel element={element} />;
      case "rect":
        return <RectLabel element={element} />;
      case "image":
        return <ImageLabel element={element} />;
      case "circle":
        return <CircleLabel element={element} />;
      case "polygon":
        return <PolygonLabel element={element} />;
      case "star":
        return <StarLabel element={element} />;
      default:
        return null;
    }
  })();
  const content = (() => {
    switch (type) {
      case "text":
        return <TextTool element={element} onChange={onChange} />;
      case "rect":
        return <RectTool element={element} onChange={onChange} />;
      case "image":
        return <ImageTool element={element} onChange={onChange} />;
      case "circle":
        return <CircleTool element={element} onChange={onChange} />;
      case "polygon":
        return <PolygonTool element={element} onChange={onChange} />;
      case "star":
        return <StarTool element={element} onChange={onChange} />;
      default:
        return null;
    }
  })();

  return (
    <div
      className={cx("border-b border-gray-500 transition-colors", {
        "bg-black/20": isOpen && visible,
      })}
    >
      <div
        className={cx("flex items-center justify-between gap-3", {
          "opacity-20": !visible,
        })}
      >
        <div className="flex items-center">
          <div className="flex flex-col items-center text-xl">
            <button
              className="-rotate-90 bg-black/20 cursor-pointer hover:bg-black"
              onClick={() => moveUpDownElement(index, -1)}
            >
              <IconChevronRight className="" />
            </button>
            <button
              className="rotate-90 bg-black/30 cursor-pointer hover:bg-black"
              onClick={() => moveUpDownElement(index, 1)}
            >
              <IconChevronRight className="" />
            </button>
          </div>
          <button
            className="bg-black/10 cursor-pointer hover:bg-black/50 transition-colors py-3 px-2"
            onClick={() => {
              onChange("visible", !visible);
            }}
          >
            <IconEye />
          </button>
          <div className="pl-3"></div>
          {lab}
        </div>
        <button
          className={cx(
            "text-2xl px-2 py-1 cursor-pointer hover:opacity-40 transition-transform",
            {
              "rotate-90": isOpen,
            }
          )}
          onClick={toggle}
        >
          <IconChevronRight />
        </button>
      </div>
      {isOpen && visible && (
        <div className="p-3 pt-0 border-t border-gray-500 border-dashed">
          <div className="flex justify-end pt-1">
            <button
              className=" uppercase text-[10px] p-1 text-red-500 hover:bg-red-900 cursor-pointer transition-colors rounded"
              onClick={() => removeElement(id)}
            >
              eliminar
            </button>
          </div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Element;
