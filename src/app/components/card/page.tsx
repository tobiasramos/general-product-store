"use client";
import styles from "./page.module.css";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { Button, Carousel, Modal, Rate, message } from "antd";
import { Product } from "../interface/product";
import Link from "antd/es/typography/Link";
const CardProduct = () => {
  const { inc, getAllProducts, products, addToCart } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(5);

  const showModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 558) {
        setVisibleProducts(5);
      } else {
        setVisibleProducts(products.length);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [products.length]);

  const addProductToCart = (product: any) => {
    if (product.stock > 0) {
      inc();
      addToCart(product);
    } else {
      message.error("Produto fora de estoque");
    }
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts: any) => prevVisibleProducts + 5);
  };

  return (
    <main className={styles.productContainer}>
      {products.slice(0, visibleProducts).map((product) => (
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
            Adicionar ao carrinho
          </Button>
          <Link className={styles.link} onClick={() => showModal(product)}>
            Ver mais...
          </Link>
        </div>
      ))}
      {visibleProducts < products.length && (
        <Button onClick={loadMoreProducts}>Carregar mais</Button>
      )}
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
                <Rate
                  disabled
                  value={Number(selectedProduct.rating.toFixed(1))}
                />
              </span>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default CardProduct;
