import React from "react";

export const MainCardFile = () => {
  const [sendFile, setSendFile] = useState(null);
  const handleFile = e => {
    const file = e.target.files[0];
    // 파일 보관
    setSendFile(file);
  };
  return (
    <img
      src={src}
      alt="Main List Image"
      style={{ width: "100%", height: "100%", borderRadius: "32px" }}
    />
  );
};

export default MainCardFile;
