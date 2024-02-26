"use client";
import styles from "./page.module.css";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
const CardProduct = () => {
  const { inc, getAllProducts, products } = useStore();

  const onChange = (currentSlide: any) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleIncrement = () => {
    inc();
  };

  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <Carousel afterChange={onChange} autoplay>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagem ${index + 1}`}
                className={styles.contentStyle}
              />
            ))}
          </Carousel>

          <h2>{product.title}</h2>
          {/* <p>{product.description}</p> */}
          <p>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            {product.discountPercentage.toLocaleString("pt-BR", {
              style: "percent",
            })}
          </p>
          <p>{product.rating}</p>
          <p>{product.stock}</p>
          <p>{product.brand}</p>
          {/* <p>{product.category}</p> */}
          <Button onClick={handleIncrement} type="primary" block className={styles.btnAdd}>
            Comprar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CardProduct;
