import PropTypes from "prop-types";
import styles from "./Key.module.css";

const Key = ({ value, onClick }) => {
  const handleClick = () => onClick(value);

  let additionalClass = "";
  if (value === "del") {
    additionalClass = styles.delKey;
  } else if (value === "reset") {
    additionalClass = styles.resetKey;
  } else if (value === "=") {
    additionalClass = styles.equalKey;
  }

  return (
    <button
      className={`${styles.key} ${additionalClass}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

Key.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Key;
