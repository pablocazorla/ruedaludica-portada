import { useContext, useMemo, useCallback } from "react";
import { MainContext } from "@/contexts/main";
import TextTool from "../editors/text";
import RectTool from "../editors/rect";
import ImageTool from "../editors/image";
import CircleTool from "../editors/circle";
import PolygonTool from "../editors/polygon";
import StarTool from "../editors/star";
import { PORTADA_SIZE } from "@/config/constants";
import getUUID from "@/utils/getUUID";

const Editor = () => {
  const {
    elementSelected: element,
    setElementSelected,
    removeElement,
    duplicateElement,
    portadaSizeId,
  } = useContext(MainContext);

  const { id, type } = element;

  const elem = element[portadaSizeId] || ELEMENT_TYPES[type].defaultValue;

  const onChange = useCallback(
    (name, value) => {
      const idImageChanges =
        name === "url" && element.type === "image"
          ? { idImage: getUUID() }
          : {};
      setElementSelected({
        ...element,
        [portadaSizeId]: {
          ...element[portadaSizeId],
          ...idImageChanges,
          [name]: value,
        },
      });
    },
    [element, setElementSelected, element, portadaSizeId]
  );

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
  }, [element, portadaSizeId]);

  const transferFromOtherPortadaSize = useCallback(
    (oldPortadaId) => {
      setElementSelected({
        ...element,
        [portadaSizeId]: {
          ...element[oldPortadaId],
        },
      });
    },
    [element, setElementSelected, element, portadaSizeId]
  );

  return (
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
  );
};

export default Editor;
