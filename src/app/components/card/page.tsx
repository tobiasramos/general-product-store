"use client";
import styles from "./page.module.css";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { Button, Carousel, Modal, Rate } from "antd";
import { Product } from "../interface/product";
import Link from "antd/es/typography/Link";
const CardProduct = () => {
  const { inc, getAllProducts, products, addToCart } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            <span className={styles.stock}>Estoque: {product.stock}</span>
          </div>
          <Button
            onClick={() => addProductToCart(product)}
            type="primary"
            block
            className={styles.btnAdd}
          >
            Comprar
          </Button>
          <Link className={styles.link} onClick={() => showModal(product)}>
            Ver mais...
          </Link>
        </div>
      ))}
      <Modal
        title={selectedProduct ? selectedProduct.title : ""}
        open={isModalOpen}
        onCancel={handleCancel}
        closable={true}
        footer={null}
      >
        {selectedProduct && (
          <div>
            <Carousel autoplay>
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  className={styles.contentStyle}
                />
              ))}
            </Carousel>
            <div>
              <span className={styles.characteristics}>Preço: </span>
              <span>
                {" "}
                {selectedProduct.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div>
              <span className={styles.characteristics}>Descrição: </span>
              <span>{selectedProduct.description}</span>
            </div>
            <div>
              <span className={styles.characteristics}>Estoque: </span>
              <span>{selectedProduct.stock}</span>
            </div>
            <div>
              <span className={styles.characteristics}>Categoria: </span>
              <span>{selectedProduct.category}</span>
            </div>
            <div>
              <span className={styles.characteristics}>Marca: </span>
              <span>{selectedProduct.brand}</span>
            </div>
            <div>
              <span className={styles.characteristics}>Avaliação: </span>
              <span>
              <Rate disabled value={Number(selectedProduct.rating.toFixed(1))} />
            </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CardProduct;
