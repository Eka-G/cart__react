import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="./logo.svg" width="150" height="50" alt="Purity" />
      </Link>
      <Link href="/cart" className={styles.header__cart}>
        <Image
          src="./shopping-bag.svg"
          width={Number(styles.cartSize)}
          height="30"
          alt="Cart"
        />
      </Link>
    </header>
  );
};

export default Header;
