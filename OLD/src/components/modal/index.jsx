import { cx } from "@/utils/cx";
import Button from "../button";
import IconClose from "../icons/close";

const Modal = ({ children, size = "lg", okButton, open, onClose }) => {
  return open ? (
    <div className="fixed z-50 overflow-hidden top-0 left-0 w-screen h-screen flex flex-col justify-center bg-black/40 px-6 backdrop-blur-md">
      <div
        className={cx("bg-gray-700 mx-auto w-full rounded-lg", {
          "max-w-4xl": size === "lg",
          "max-w-96": size === "sm",
        })}
      >
        <header className="flex items-center justify-end">
          <button
            className="p-3 cursor-pointer hover:opacity-50"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            <IconClose />
          </button>
        </header>
        <div className="px-6 pb-6">{children}</div>
        <footer className="px-6 py-5 flex items-center justify-center gap-3 border-t border-gray-600">
          <Button
            className="bg-gray-500 hover:bg-gray-800"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Cancelar
          </Button>
          {okButton ? (
            <Button
              className=""
              onClick={() => {
                okButton.onClick();
                if (onClose) onClose();
              }}
            >
              {okButton.text}
            </Button>
          ) : null}
        </footer>
      </div>
    </div>
  ) : null;
};

export default Modal;
