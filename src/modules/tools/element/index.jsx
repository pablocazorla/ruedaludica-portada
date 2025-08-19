import { useContext } from "react";
import { MainContext } from "@/contexts/main";
import { cx } from "@/utils/cx";
import Editor from "./editor";
import Label from "./label";

const Element = ({ element, index }) => {
  const { elementSelected } = useContext(MainContext);

  return (
    <div
      className={cx("border-b border-gray-500", {
        "bg-black/20": elementSelected?.id === element.id,
      })}
    >
      <Label element={element} index={index} />
      {elementSelected?.id === element.id && <Editor element={element} />}
    </div>
  );
};

export default Element;
