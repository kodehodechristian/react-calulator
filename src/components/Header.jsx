import styles from './Header.module.css';

const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Header;