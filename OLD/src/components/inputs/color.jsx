import { useEffect, useState } from "react";
import Label from "./label";
import Container from "./container";

const InputColor = ({ label, name, value, onChange, className }) => {
  const [v, setV] = useState("");

  useEffect(() => {
    setV(value);
  }, [value]);

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <input
        type="color"
        className="block w-[32px] h-[32px] rounded border border-gray-600 bg-gray-800 text-sm p-0 m-0 outline-none focus:border-sky-600"
        value={v}
        onChange={(e) => {
          if (onChange) onChange(name, e.target.value);
        }}
      />
    </Container>
  );
};

export default InputColor;
