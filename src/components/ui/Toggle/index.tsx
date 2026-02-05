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

  const handleToggle = (target: "events" | "works") => {
    if ((target === "works") === isWorks) return;

    const newPath = target === "works" ? "/works" : "/events";
    router.push(newPath);
    onToggle?.(target === "works");
  };

  return (
    <div
      className={styles.toggleContainer}
      style={{
        // @ts-ignore
        "--active-anchor": isWorks ? "--toggle-works" : "--toggle-events",
      }}
    >
      <button
        type="button"
        className={`${styles.label} ${!isWorks ? styles.active : ""}`}
        onClick={() => handleToggle("events")}
        style={{ anchorName: "--toggle-events" } as React.CSSProperties}
        aria-label="イベント一覧に切り替え"
      >
        イベント
      </button>
      <button
        type="button"
        className={`${styles.label} ${isWorks ? styles.active : ""}`}
        onClick={() => handleToggle("works")}
        style={{ anchorName: "--toggle-works" } as React.CSSProperties}
        aria-label="作品一覧に切り替え"
      >
        作品
      </button>
    </div>
  );
};

export default Toggle;
