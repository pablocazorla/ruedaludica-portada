import { useContext } from "react";
import { MainContext } from "@/contexts/main";
import AddElement from "./add";
import { PORTADA_SIZE } from "@/config/constants";
import Element from "./element";
import JsonModal from "@/components/jsonModal";
import PresetsModal from "@/components/presets";

const Tools = () => {
  const { elementList, portadaSizeId } = useContext(MainContext);
  return (
    <div className="w-[400px] h-screen bg-gray-700 border-l border-gray-500 overflow-y-scroll overflow-x-hidden scrollbar-custom shadow">
      <div className="p-5 ">
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-500">
          <div className="font-bold">{PORTADA_SIZE[portadaSizeId].title}</div>
          <div className="flex items-center justify-end gap-2">
            <PresetsModal />
            <JsonModal />
          </div>
        </div>

        {elementList.length > 0 ? (
          <div className="min-h-[10px] border-t border-x border-gray-500 flex flex-col">
            {elementList.map((element, k) => {
              return <Element key={element.id} index={k} element={element} />;
            })}
          </div>
        ) : null}
        <div className="flex items-center justify-center py-3">
          <AddElement />
        </div>
      </div>
    </div>
  );
};

export default Tools;
