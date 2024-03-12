"use client";
import CartIcon from "../cart-icon/page";
import Filter from "../filter/page";
import Search from "../search/page";
import styles from "./page.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <h1>Loja de produtos em geral</h1>
        <CartIcon />
      </div>

      <div className={styles.searches}>
        <Search />
        <Filter />
      </div>
    </header>
  );
};
export default Header;
