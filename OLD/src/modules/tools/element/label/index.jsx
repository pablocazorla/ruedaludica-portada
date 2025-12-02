import { useContext, useMemo, useCallback } from "react";
import { MainContext } from "@/contexts/main";
import { IconChevronRight } from "@/components/icons/chevronRight";
import { cx } from "@/utils/cx";
import { IconEye } from "@/components/icons/eye";
import ELEMENT_TYPES from "@/config/elementTypes";

const Label = ({ element, index }) => {
  const {
    toggleElementVisibility,
    moveUpDownElement,
    portadaSizeId,
    setElementSelected,
  } = useContext(MainContext);

  const elem = useMemo(() => {
    return element[portadaSizeId] || ELEMENT_TYPES[element?.type]?.defaultValue;
  }, [element, portadaSizeId]);

  const lab = useMemo(() => {
    switch (element?.type) {
      case "text":
        return (
          <>
            <div className="h-5 overflow-hidden opacity-40">{elem?.text}</div>
            <div className="italic">(texto)</div>
          </>
        );
      case "rect":
        return (
          <>
            <div className="h-5 w-7" style={{ backgroundColor: elem?.color }} />
            <div className="italic">(rectángulo)</div>
          </>
        );
      case "image":
        return (
          <>
            <div className="h-6 w-6">
              <img src={elem?.url} className="w-full h-full" />
            </div>
            <div className="font-bold">{elem?.name}</div>
            <div className="italic">(imagen)</div>
          </>
        );
      case "circle":
        return (
          <>
            <div className="font-bold">Círculo:</div>
            <div
              className="w-5 aspect-square rounded-full"
              style={{ backgroundColor: elem?.color }}
            />
          </>
        );
      case "polygon":
        return (
          <>
            <div className="font-bold">Polígono:</div>
            <div
              className="h-3 w-4 border-8 border-t-0"
              style={{
                borderColor: `transparent transparent ${elem.color}`,
              }}
            />
          </>
        );
      case "star":
        return (
          <>
            <div className="font-bold">Estrella:</div>
            <div
              className="h-3 w-4 border-8 border-b-0"
              style={{
                borderColor: ` ${elem?.color} transparent transparent`,
              }}
            />
          </>
        );
      default:
        return null;
    }
  }, [element, elem]);

  return (
    <div
      className={cx("flex items-center", {
        "opacity-20": !elem.visible,
      })}
    >
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
          toggleElementVisibility(element.id);
        }}
      >
        <IconEye />
      </button>
      <button
        className="flex-1 py-2 cursor-pointer"
        onClick={() => {
          setElementSelected(element);
        }}
      >
        <div className="flex items-center gap-1 text-sm">{lab}</div>
      </button>
    </div>
  );
};

export default Label;
