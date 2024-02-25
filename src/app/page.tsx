"use client";
import Header from "./components/header/page";
import "./globals.css";
import axios from "axios";
import { useStore } from "./store";

export default function Home() {
  const { inc } = useStore();

  const handleIncrement = () => {
    inc();
  };
  axios
    .get("https://dummyjson.com/products")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log("Erro ao buscar os dados: " + error);
    });
  return (
    <>
      <Header />
      <button onClick={handleIncrement}>Comprar</button>
    </>
  );
}
