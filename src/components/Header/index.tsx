import style from "./index.module.css";

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <h1 className={style.logo}>KCL Works</h1>
    </header>
  );
};
