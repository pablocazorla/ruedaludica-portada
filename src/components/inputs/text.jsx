import { useEffect, useState } from "react";
import Label from "./label";
import { IconReturn } from "../icons/return";
import Container from "./container";

const InputText = ({ label, name, value, onChange, className }) => {
  const [v, setV] = useState("");

  useEffect(() => {
    setV(value);
  }, [value]);

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <div className="flex items-stretch">
        <input
          type="text"
          className="block w-full rounded-l border border-gray-600 bg-gray-800 text-sm px-2 outline-none focus:border-sky-600"
          value={v}
          onChange={(e) => {
            setV(e.target.value);
          }}
        />
        <button
          className="rounded-r cursor-pointer bg-sky-600 hover:bg-sky-900 text-sm px-2"
          onClick={() => {
            if (onChange) onChange(name, v);
          }}
        >
          <IconReturn />
        </button>
      </div>
    </Container>
  );
};

export default InputText;
