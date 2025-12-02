import Label from "./label";
import Container from "./container";
import { cx } from "@/utils/cx";

const Textarea = ({
  label,
  name,
  value,
  onChange,
  className,
  classNameInput,
}) => {
  return (
    <Container className={className}>
      <Label>{label}</Label>
      <textarea
        className={cx(
          "block w-full rounded-l border border-gray-600 bg-gray-800 text-sm px-2 outline-none focus:border-sky-600 min-h-6",
          classNameInput
        )}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(name, e.target.value);
        }}
      />
    </Container>
  );
};

export default Textarea;
