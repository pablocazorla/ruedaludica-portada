import { useState, useContext } from "react";
import { MainContext } from "@/contexts/main";
import Modal from "@/components/modal";
import presets from "@/config/presets";

const PresetsModal = () => {
  const { updateList } = useContext(MainContext);

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        onClick={toggle}
        className="bg-violet-600 uppercase text-sm px-3  rounded cursor-pointer transition-colors hover:bg-violet-900"
      >
        Presets
      </button>
      <Modal open={open} onClose={toggle}>
        <h2 className="font-bold text-xl mb-3">Cargar Preset</h2>
        <div className="flex flex-col max-w-2xs gap-3">
          {presets.map(({ name, elementList }) => {
            return (
              <button
                className="bg-green-700 p-1 rounded-md hover:bg-green-950 transition-colors cursor-pointer"
                key={name}
                onClick={() => {
                  updateList(elementList);
                  toggle();
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default PresetsModal;
