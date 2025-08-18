import { useState, useCallback, useContext, useMemo } from "react";
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
import getUUID from "@/utils/getUUID";
import ELEMENT_TYPES from "@/config/elementTypes";
import { PORTADA_SIZE } from "@/config/constants";

const Element = ({ element, index }) => {
  const {
    updateElement,
    moveUpDownElement,
    removeElement,
    duplicateElement,
    portadaSizeId,
  } = useContext(MainContext);

  const { id, type } = element;

  const { visible } = element[portadaSizeId] || { visible: true };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onChange = useCallback(
    (name, value) => {
      const idImageChanges =
        name === "url" && element.type === "image"
          ? { idImage: getUUID() }
          : {};
      updateElement({
        ...element,
        [portadaSizeId]: {
          ...element[portadaSizeId],
          ...idImageChanges,
          [name]: value,
        },
      });
    },
    [updateElement, element, portadaSizeId]
  );

  const transferFromOtherPortadaSize = useCallback(
    (oldPortadaId) => {
      updateElement({
        ...element,
        [portadaSizeId]: {
          ...element[oldPortadaId],
        },
      });
    },
    [updateElement, element, portadaSizeId]
  );

  const elem = element[portadaSizeId] || ELEMENT_TYPES[type].defaultValue;

  const lab = (() => {
    switch (type) {
      case "text":
        return <TextLabel element={elem} />;
      case "rect":
        return <RectLabel element={elem} />;
      case "image":
        return <ImageLabel element={elem} />;
      case "circle":
        return <CircleLabel element={elem} />;
      case "polygon":
        return <PolygonLabel element={elem} />;
      case "star":
        return <StarLabel element={elem} />;
      default:
        return null;
    }
  })();
  const content = (() => {
    switch (type) {
      case "text":
        return <TextTool element={elem} onChange={onChange} />;
      case "rect":
        return <RectTool element={elem} onChange={onChange} />;
      case "image":
        return <ImageTool element={elem} onChange={onChange} />;
      case "circle":
        return <CircleTool element={elem} onChange={onChange} />;
      case "polygon":
        return <PolygonTool element={elem} onChange={onChange} />;
      case "star":
        return <StarTool element={elem} onChange={onChange} />;
      default:
        return null;
    }
  })();

  const ListTransfer = useMemo(() => {
    return Object.keys(PORTADA_SIZE).filter((key) => {
      if (key === portadaSizeId) {
        return false;
      }
      if (element[key]) {
        return true;
      }
      return false;
    });
  }, [portadaSizeId]);

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
          <div className="flex justify-end pt-1 gap-3">
            {ListTransfer.map((opt) => {
              return (
                <button
                  key={opt}
                  className=" uppercase text-[10px] p-1 text-sky-500 hover:bg-green-900 cursor-pointer transition-colors rounded"
                  onClick={() => {
                    transferFromOtherPortadaSize(opt);
                  }}
                >
                  {`transferir desde ${opt}`}
                </button>
              );
            })}

            <button
              className=" uppercase text-[10px] p-1 text-green-500 hover:bg-green-900 cursor-pointer transition-colors rounded"
              onClick={() => duplicateElement(id)}
            >
              duplicar
            </button>
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
