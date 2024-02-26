"use client";
import { useStore } from "../../store";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";

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
    <div>
      <Input
        addonBefore={<SearchOutlined />}
        placeholder="Digite o nome do produto"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
