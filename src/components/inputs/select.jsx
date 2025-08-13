import { useEffect, useState } from "react";
import Label from "./label";
import Container from "./container";

const Select = ({ label, name, value, onChange, className, options }) => {
  const [v, setV] = useState("");

  useEffect(() => {
    setV(value);
  }, [value]);

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <select
        className="block w-full rounded border border-gray-600 bg-gray-800 text-sm px-2 outline-none focus:border-sky-600"
        value={value}
        onChange={(e) => {
          if (onChange) onChange(name, e.target.value);
        }}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
