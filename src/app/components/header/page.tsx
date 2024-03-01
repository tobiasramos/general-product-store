"use client";
import CartIcon from "../cart-icon/page";
import styles from "./page.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Loja de produtos em geral</h1>
      <CartIcon />
    </header>
  );
};
export default Header;
