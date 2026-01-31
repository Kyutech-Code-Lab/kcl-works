import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo_ver2.png";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/events">
        <Image src={Logo} alt="KCL Works Logo" className={styles.logo} />
      </Link>
    </header>
  );
};

export default Header;
