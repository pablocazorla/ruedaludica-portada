import { cx } from "@/utils/cx";

const Nav = ({ tabList, currentTab, setCurrentTab, className }) => {
  return (
    <nav
      className={cx("flex items-end border-b border-gray-200/20", className)}
    >
      {tabList.map(({ text, value }) => {
        return (
          <button
            key={value}
            className={cx(
              "px-4 py-1 border-b-4 border-transparent text-gray-400 cursor-pointer transition-colors relative top-[2px]",
              {
                "border-sky-500 text-white": currentTab === value,
              }
            )}
            onClick={() => setCurrentTab(value)}
          >
            {text}
          </button>
        );
      })}
    </nav>
  );
};

export default Nav;
