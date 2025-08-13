import Label from "./label";
import Container from "./container";

const Textarea = ({ label, name, value, onChange, className }) => {
  return (
    <Container className={className}>
      <Label>{label}</Label>
      <textarea
        className="block w-full rounded-l border border-gray-600 bg-gray-800 text-sm px-2 outline-none focus:border-sky-600 min-h-6"
        value={value}
        onChange={(e) => {
          if (onChange) onChange(name, e.target.value);
        }}
      />
    </Container>
  );
};

export default Textarea;
