"use client";
import styles from "./page.module.css";
import { useStore } from "../../store";
import { useEffect } from "react";
import { Button, Carousel, Rate } from "antd";
const CardProduct = () => {
  const { inc, getAllProducts, products, addToCart } = useStore();

  useEffect(() => {
    getAllProducts();
  }, []);

  const addProductToCart = (product: any) => {
    inc();
    addToCart(product);
  };

  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <Carousel autoplay>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagem ${index + 1}`}
                className={styles.contentStyle}
              />
            ))}
          </Carousel>
          <div className={styles.description}>
            <h2>{product.title}</h2>
            <p className={styles.price}>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <div>
              {product.rating.toFixed(1)}
              :
              <Rate disabled value={Number(product.rating.toFixed(1))} />
            </div>
          </div>
          <Button
            onClick={() => addProductToCart(product)}
            type="primary"
            block
            className={styles.btnAdd}
          >
            Comprar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CardProduct;
