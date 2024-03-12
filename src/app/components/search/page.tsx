"use client";
import { useStore } from "../../store";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import styles from "./page.module.css"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchByName } = useStore();

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      searchByName(searchTerm);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        addonBefore={<SearchOutlined />}
        placeholder="Digite o nome do produto"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.search}
      />
    </div>
  );
};

export default Search;
