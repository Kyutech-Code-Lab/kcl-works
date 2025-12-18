import styles from "./styles.module.css";

interface HeroProps {
  title: string;
  imageUrl: string;
}

const Hero = ({ title, imageUrl }: HeroProps) => {
  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default Hero;
