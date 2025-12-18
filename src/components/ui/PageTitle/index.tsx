import styles from "./styles.module.css";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default PageTitle;
