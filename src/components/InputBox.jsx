import { useEffect, useState, useRef } from "react";
import STYLES from "./InputBox.module.css";

export default function InputBox({
  children,
  type,
  accept,
  callback,
  error,
  preText,
}) {
  const [value, setValue] = useState(preText ?? "");
  const errorMessage = useRef(error && error.message ? error.message : "");
  const [isValid, setIsValid] = useState(
    error && error.isValid ? error.isValid : false
  );

  function handleValue(e) {
    e.preventDefault();

    if (type === "file") {
      const file = e.target.files[0];
      callback?.(file);
    } else {
      setValue(e.target.value);
      callback?.(e.target.value);
    }
  }

  useEffect(() => {
    if (error) {
      setIsValid(error.isValid);
    }
  }, [error]);

  return (
    <div>
      <>
        <div className={STYLES.wrapperStyle}>
          <p>{children}</p>
        </div>
        <input
          type={type}
          className={STYLES.boxStyle}
          value={type === "file" ? undefined : value}
          accept={accept}
          onChange={(e) => handleValue(e)}
        />
        {!isValid && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {errorMessage.current}
          </p>
        )}
      </>
    </div>
  );
}
