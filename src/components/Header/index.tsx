"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo_ver2.png";
import Toggle from "../ui/Toggle";
import styles from "./styles.module.css";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={Logo} alt="KCL Works Logo" className={styles.logo} />
      </Link>
      {pathname !== "/" && <Toggle />}
    </header>
  );
};

export default Header;
