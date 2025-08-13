import { useState, useContext } from "react";
import { MainContext } from "@/contexts/main";
import Modal from "@/components/modal";

const Content = ({ toggle }) => {
  const { elementList, updateList } = useContext(MainContext);

  const [content, setContent] = useState(JSON.stringify(elementList, null, 2));

  return (
    <Modal
      open={true}
      onClose={toggle}
      okButton={{
        text: "Actualizar",
        onClick: () => {
          try {
            updateList(JSON.parse(content));
          } catch (e) {}
          toggle();
        },
      }}
    >
      <h2 className="font-bold text-xl mb-3">JSON</h2>
      <textarea
        className="bg-gray-800 font-mono p-3 w-full min-h-[60vh]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </Modal>
  );
};

const JsonModal = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        onClick={toggle}
        className="bg-green-600 uppercase text-sm px-3  rounded cursor-pointer transition-colors hover:bg-green-900"
      >
        JSON
      </button>
      {open && <Content toggle={toggle} />}
    </>
  );
};

export default JsonModal;
