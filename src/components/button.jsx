import { cx } from "@/utils/cx";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={cx(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded cursor-pointer transition-colors",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
