import PropTypes from 'prop-types';
import styles from './Display.module.css';

const Display = ({ value }) => {
  return (
    <div className={styles.display}>
      {value}
    </div>
  );
};

Display.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Display;