"use client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import { useStore } from "../../store";

const Header = () => {
  const count = useStore((state) => state.count);
  return (
    <header className={styles.header}>
      <h1>Loja de produtos em geral</h1>
      <div className={styles.iconCartContainer}>
        <span className={styles.cartCount}>{count}</span>
        <ShoppingCartOutlined
          className={styles.iconCart}
        ></ShoppingCartOutlined>
      </div>
    </header>
  );
};
export default Header;
