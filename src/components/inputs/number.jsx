import { useContext, useEffect, useState } from "react";
import Label from "./label";
import Container from "./container";
import { MainContext } from "@/contexts/main";

const InputNumber = ({
  label,
  name,
  value,
  onChange,
  className,
  step = 1,
  ...rest
}) => {
  const { moveRatio } = useContext(MainContext);

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
        step={step * moveRatio}
        {...rest}
      />
    </Container>
  );
};

export default InputNumber;
