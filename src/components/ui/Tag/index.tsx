import styles from "./styles.module.css";

interface TagProps {
  children: string;
  type: "genre" | "creator";
}

const Tag = ({ children, type }: TagProps) => {
  return (
    <span
      className={`${styles.tag} ${type === "genre" ? styles.genre : styles.creator}`}
    >
      {children}
    </span>
  );
};

export default Tag;
