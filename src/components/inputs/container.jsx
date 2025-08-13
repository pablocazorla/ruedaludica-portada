import { cx } from "@/utils/cx";

const Container = ({ className, children }) => {
  return <div className={cx("mb-3", className)}>{children}</div>;
};

export default Container;
