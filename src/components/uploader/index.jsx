import { useEffect, useRef } from "react";

const UploadWidget = ({ name, onChange }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "cazu",
        uploadPreset: "upload-images",
      },
      function (error, result) {
        if (result?.info?.files?.[0]?.uploadInfo?.url) {
          onChange(name, result?.info?.files?.[0]?.uploadInfo?.url);
        }
      }
    );
  }, [name, onChange]);

  return (
    <div className="pb-3 mb-3 border-b border-gray-500">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-6 rounded cursor-pointer transition-colors"
        onClick={() => widgetRef.current.open()}
      >
        Cargar imagen
      </button>
    </div>
  );
};

export default UploadWidget;
