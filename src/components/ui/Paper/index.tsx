import styles from "./styles.module.css";

interface PaperProps {
  children: React.ReactNode;
}

const Paper = ({ children }: PaperProps) => {
  return <div className={styles.paper}>{children}</div>;
};

export default Paper;
