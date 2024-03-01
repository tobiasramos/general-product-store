"use client";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styles from "./page.module.css";
import { useStore } from "../../store";
import { useState } from "react";
import { Button, Drawer, message } from "antd";
const CartIcon = () => {
  const [count, setCount] = useStore((state) => [state.count, state.setCount]);
  const { cart, deleteToCart } = useStore();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const finalizeCart = () => {
    if (count === 0) {
      message.error("Seu carrinho está vazio!");
    } else {
      message.success("Compra aprovada!");
      setCount(0);
    }
  };
  return (
    <div className={styles.iconCartContainer}>
      <span className={styles.cartCount}>{count}</span>
      <ShoppingCartOutlined
        className={styles.iconCart}
        onClick={showDrawer}
      ></ShoppingCartOutlined>
      <Drawer
        title="Itens adicionados no carrinho"
        onClose={onClose}
        open={open}
        className={styles.drawer}
      >
        {count === 0 ? (
          <p>Seu carrinho está vazio!</p>
        ) : (
          <>
            {cart.map((product) => (
              <div key={product.id} className={styles.product}>
                <img
                  src={product.images[0]}
                  alt={`Imagem 1`}
                  className={styles.contentStyle}
                />
                <div>
                  <p>{product.title}</p>
                  <p>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <DeleteOutlined onClick={() => deleteToCart(product)} />
                  <div>
                    <MinusOutlined />
                    <span>0</span>
                    <PlusOutlined />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="primary"
              block
              onClick={finalizeCart}
              className={styles.btnFinalizePurchase}
            >
              Finalizar compra
            </Button>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default CartIcon;
