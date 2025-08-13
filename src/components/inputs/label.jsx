import { cx } from "@/utils/cx";

const Label = ({ children, className, ...rest }) => {
  return (
    <label
      className={cx(
        "block uppercase text-[10px] font-semibold opacity-60",
        className
      )}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;
