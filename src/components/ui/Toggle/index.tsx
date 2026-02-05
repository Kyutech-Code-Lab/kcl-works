"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./styles.module.css";

interface ToggleProps {
  onToggle?: (isWorks: boolean) => void;
}

const Toggle = ({ onToggle }: ToggleProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isWorks = pathname.startsWith("/works");

  const handleToggle = () => {
    const newPath = isWorks ? "/events" : "/works";
    router.push(newPath);
    onToggle?.(!isWorks);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={isWorks ? "イベント一覧に切り替え" : "作品一覧に切り替え"}
      style={{
        // @ts-ignore
        "--active-anchor": isWorks ? "--toggle-works" : "--toggle-events",
      }}
    >
      <div className={styles.toggleContainer}>
        <span
          className={styles.label}
          style={{ anchorName: "--toggle-events" } as React.CSSProperties}
        >
          イベント
        </span>
        <span
          className={styles.label}
          style={{ anchorName: "--toggle-works" } as React.CSSProperties}
        >
          作品
        </span>
      </div>
    </button>
  );
};

export default Toggle;
