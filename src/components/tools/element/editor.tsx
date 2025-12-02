import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context";
import elementAdapter from "@/utils/elementAdapter";

const Editor = () => {
  const { elementSelected, setElementSelected } = useContext(MainContext);

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(elementAdapter.toString(elementSelected));
  }, [elementSelected]);

  const onBlur = () => {
    setElementSelected(elementAdapter.toElement(elementSelected, value));
  };

  return (
    <div className="px-5 py-4 border-t border-gray-700">
      <textarea
        className="w-full h-96 text-sm bg-gray-900 text-white p-3 font-mono"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={onBlur}
        value={value}
        // onKeyUp={(e) => {
        //   if (e.key === "Enter") {
        //     onBlur();
        //   }
        // }}
      />
    </div>
  );
};

export default Editor;
