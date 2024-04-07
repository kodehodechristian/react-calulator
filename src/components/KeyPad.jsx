import React from "react";
import Key from "./Key";
import styles from "./KeyPad.module.css";

const KeyPad = ({ onKeyPress }) => {
  const keys = [
    { key: "7" },
    { key: "8" },
    { key: "9" },
    { key: "del", className: "del-key" },

    { key: "4" },
    { key: "5" },
    { key: "6" },
    { key: "+", className: "add-key" },

    { key: "1" },
    { key: "2" },
    { key: "3" },
    { key: "-", className: "sub-key" },

    { key: ".", className: "dot-key" },
    { key: "0" },
    { key: "/", className: "div-key" },
    { key: "x", className: "mul-key" },

    { key: "reset", className: "reset-key spanTwoColumns" },
    { key: "=", className: "equal-key spanTwoColumns" },
  ];

  return (
    <div className={styles.keypad}>
      {keys.map((item) => (
        <Key
          key={item.key}
          value={item.key}
          onClick={onKeyPress}
          className={`${styles.key} ${item.className || ""}`}
        />
      ))}
    </div>
  );
};

export default KeyPad;