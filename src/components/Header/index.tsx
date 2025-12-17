import styles from "./styles.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>KCL Works</h1>
    </header>
  );
};
