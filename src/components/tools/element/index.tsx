import { useContext, useMemo } from "react";
import Label from "./label";
import type { Element } from "@/models/element";
import { MainContext } from "@/context";
import { cx } from "@/utils/cx";
import Editor from "./editor";

interface Props {
  index: number;
  element: Element;
}

const ElementComp = ({ index, element }: Props) => {
  const { elementSelected } = useContext(MainContext);

  const isSelectedElement = useMemo(() => {
    return element.id === elementSelected?.id;
  }, [element, elementSelected]);

  return (
    <div
      className={cx("border-b border-gray-500", {
        "bg-black/30": isSelectedElement,
      })}
    >
      <Label
        element={element}
        index={index}
        isSelectedElement={isSelectedElement}
      />
      {isSelectedElement && <Editor />}
    </div>
  );
};

export default ElementComp;
