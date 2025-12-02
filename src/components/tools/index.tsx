import { MainContext } from "@/context";
import { useContext } from "react";
import ElementComp from "./element";

const Tools = () => {
  const { elementList } = useContext(MainContext);

  return (
    <div className="w-[400px] h-screen bg-gray-700 border-l border-gray-500 overflow-y-scroll overflow-x-hidden scrollbar-custom shadow">
      <div className="p-5">
        {elementList.length > 0 ? (
          <div className="min-h-[10px] border-t border-x border-gray-500 flex flex-col">
            {elementList.map((element, k) => {
              return (
                <ElementComp key={element.id} index={k} element={element} />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Tools;
