import { useState } from "react";

export default function InputBox({ children, type, accept, callback }) {
  const [value, setValue] = useState("");

  function handleValue(e) {
    e.preventDefault();
    setValue(e.target.value);
    callback?.(e.target.value);
  }

  const boxStyle = {
    border: "1px solid #0f4c75",
    fontSize: "14px",
    borderRadius: "4px",
    margin: "4px 0",
    padding: "8px 16px",
    height: "42px",
    maxHeight: "42px",
    boxSizing: "border-box",
    width: "100%",
  };

  const wrapperStyle = {
    color: "#0f4c75",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  };

  return (
    <div>
      <>
        <div style={wrapperStyle}>
          <p>{children}</p>
        </div>
        <input
          type={type}
          style={boxStyle}
          value={value}
          accept={accept}
          onChange={(e) => handleValue(e)}
        />
      </>
    </div>
  );
}
