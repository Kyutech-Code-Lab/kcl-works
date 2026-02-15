import styles from "./styles.module.css";

const Badge = ({ children }: { children: string }) => {
  const text = children ?? "";
  const len = text.length;

  let fontSizeRem = 1.6;
  if (len > 6) fontSizeRem = 0.8;
  else if (len > 4) fontSizeRem = 0.9;
  else if (len > 3) fontSizeRem = 1.1;
  else if (len > 2) fontSizeRem = 1.4;

  return (
    <div className={styles["badge-container"]}>
      <div className={styles["badge-wrapper"]}>
        <p className={styles.badge} style={{ fontSize: `${fontSizeRem}rem` }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Badge;
