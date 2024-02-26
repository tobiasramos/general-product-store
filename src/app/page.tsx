"use client";
import CardProduct from "./components/card/page";
import Filter from "./components/filter/page";
import Header from "./components/header/page";
import Search from "./components/search/page";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Header />
      <Filter />
      <Search />
      <CardProduct />
    </>
  );
}
