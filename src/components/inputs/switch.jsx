import Container from "./container";
import Label from "./label";

const Switch = ({ label, name, value, onChange, className }) => {
  return (
    <Container className={className}>
      <Label className="flex items-center cursor-pointer opacity-85 gap-2">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => {
            if (onChange) onChange(name, e.target.checked);
          }}
        />
        {label}
      </Label>
    </Container>
  );
};

export default Switch;
