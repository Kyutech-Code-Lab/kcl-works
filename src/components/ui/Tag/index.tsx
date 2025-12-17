import styles from "./styles.module.css";

interface TagProps {
  children: string;
}

const Tag = ({ children }: TagProps) => {
  return <span className={styles.tag}>{children}</span>;
};

export default Tag;
