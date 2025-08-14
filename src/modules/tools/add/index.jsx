import Button from "@/components/button";
import Modal from "@/components/modal";
import Nav from "@/components/nav";
import { useState, useContext } from "react";
import { MainContext } from "@/contexts/main";
import ELEMENT_TYPES from "@/config/elementTypes";
import TextTool from "../text";
import RectTool from "../rect";
import { ImageLoader } from "../image";
import CircleTool from "../circle";
import PolygonTool from "../polygon";
import StarTool from "../star";

const tabList = Object.values(ELEMENT_TYPES).map(
  ({ name: text, type: value }) => {
    return { text, value };
  }
);

const AddElement = () => {
  const { addElement } = useContext(MainContext);

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  //
  const [currentTab, setCurrentTab] = useState(tabList[0].value);

  const [newElement, setNewElement] = useState(
    ELEMENT_TYPES[tabList[0].value].defaultValue
  );

  const onChangeTab = (value) => {
    setNewElement(ELEMENT_TYPES[value].defaultValue);
    setCurrentTab(value);
  };

  const onChange = (name, value) => {
    setNewElement({
      ...newElement,
      [name]: value,
    });
  };

  let content = null;
  switch (currentTab) {
    case "text":
      content = <TextTool element={newElement} onChange={onChange} />;
      break;
    case "rect":
      content = <RectTool element={newElement} onChange={onChange} />;
      break;
    case "image":
      content = <ImageLoader element={newElement} onChange={onChange} />;
      break;
    case "circle":
      content = <CircleTool element={newElement} onChange={onChange} />;
      break;
    case "polygon":
      content = <PolygonTool element={newElement} onChange={onChange} />;
      break;
    case "star":
      content = <StarTool element={newElement} onChange={onChange} />;
      break;
    default:
      content = "pablito";
      break;
  }

  return (
    <>
      <Button onClick={toggle}>Agregar Elemento</Button>
      <Modal
        open={open}
        onClose={toggle}
        okButton={{
          text: "Agregar",
          onClick: () => {
            const idImageChanges =
              currentTab === "image" ? { idImage: crypto.randomUUID() } : {};

            addElement({
              ...newElement,
              ...idImageChanges,
              id: crypto.randomUUID(),
              type: currentTab,
              visible: true,
            });
            toggle();
          },
        }}
      >
        <h2 className="font-bold text-xl mb-3">Agregar Elemento</h2>
        <Nav
          tabList={tabList}
          currentTab={currentTab}
          setCurrentTab={onChangeTab}
          className="mb-5"
        />
        {content}
      </Modal>
    </>
  );
};

export default AddElement;
