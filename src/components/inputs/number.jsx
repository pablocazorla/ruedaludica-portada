import { useEffect, useState } from "react";
import Label from "./label";
import Container from "./container";

const InputNumber = ({ label, name, value, onChange, className, ...rest }) => {
  const [v, setV] = useState("");

  useEffect(() => {
    setV(value);
  }, [value]);

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <input
        type="number"
        className="block max-w-[80px] w-full rounded border border-gray-600 bg-gray-800 text-sm px-2 outline-none focus:border-sky-600"
        value={value}
        onChange={(e) => {
          if (onChange) onChange(name, parseFloat(e.target.value));
        }}
        {...rest}
      />
    </Container>
  );
};

export default InputNumber;
