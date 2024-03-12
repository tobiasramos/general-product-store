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
  const {
    cart,
    deleteToCart,
    finalizePurchase,
    decrementQuantity,
    incrementQuantity,
  } = useStore();

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
      message.success("Compra efetuada!");
      setCount(0);
      finalizePurchase();
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
                <div className={styles.infoContainer} >
                  <div className={styles.info}>
                  <p>{product.title}</p>
                  <p>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  </div>
                 
                  <div className={styles.btnsContainer}>
                    {" "}
                    <div className={styles.btnsMinusPlus}>
                      <MinusOutlined
                        onClick={() => decrementQuantity(product.id)}
                      />
                      <span>{product.quantity}</span>
                      <PlusOutlined
                        onClick={() => incrementQuantity(product.id)}
                      />
                    </div>
                    <DeleteOutlined className={styles.deleteIcon} onClick={() => deleteToCart(product)} />
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
