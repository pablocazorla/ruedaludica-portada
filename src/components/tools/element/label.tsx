import { MainContext } from "@/context";
import type { Element } from "@/models/element";
import { useContext, useMemo } from "react";
import { IconChevronRight } from "@/components/icons/chevronRight";
import { cx } from "@/utils/cx";
import { IconEye } from "@/components/icons/eye";
import { getElementType } from "@/utils/getElementType";

interface Props {
  index: number;
  element: Element;
  isSelectedElement: boolean;
}

const Label = ({ index, element, isSelectedElement }: Props) => {
  const { setElementSelected } = useContext(MainContext);

  const labelContent = useMemo(() => {
    const type = getElementType(element);
    let label = <>{""}</>;

    switch (type) {
      case "rect":
        label = (
          <div className="flex items-center gap-1">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: element?.color || "#000" }}
            />
            <div>
              Rect{" "}
              {element.name ? (
                <span className="italic">"{element.name}"</span>
              ) : null}
            </div>
          </div>
        );
        break;
      // case "circle":
      //   label = "Circle";
      //   break;
      // case "text":
      //   label = "Text";
      //   break;
      // case "image":
      //   label = "Image";
      //   break;
      default:
        break;
    }
    return label;
  }, [element]);

  return (
    <div
      className={cx("flex items-center", {
        "opacity-20": !element.visible,
      })}
    >
      <div className="flex flex-col items-center text-xl">
        <button
          className="-rotate-90 bg-black/20 cursor-pointer hover:bg-black"
          //onClick={() => moveUpDownElement(index, -1)}
        >
          <IconChevronRight />
        </button>
        <button
          className="rotate-90 bg-black/30 cursor-pointer hover:bg-black"
          //onClick={() => moveUpDownElement(index, 1)}
        >
          <IconChevronRight />
        </button>
      </div>
      <button
        className="bg-black/10 cursor-pointer hover:bg-black/50 transition-colors py-3 px-2"
        //onClick={() => {
        // toggleElementVisibility(element.id);
        //}}
      >
        <IconEye />
      </button>
      <button
        className="flex-1 py-2 cursor-pointer"
        onClick={() => {
          setElementSelected(element);
        }}
      >
        <div className="flex items-center gap-1 text-sm">{labelContent}</div>
      </button>
    </div>
  );
};

export default Label;
