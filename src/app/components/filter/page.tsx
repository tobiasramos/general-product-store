"use client";
import { useStore } from "../../store";
import styles from "./page.module.css";

const Filter = () => {
  const { filterProducts } = useStore();

  const handleFilterChange = async (e: any) => {
    const selectedCategory = e.target.value;
    await filterProducts(selectedCategory);
  };
  return (
    <div className={styles.container}>
      <h1>Filtrar por:</h1>
      <select name="category" onChange={handleFilterChange}>
        <option value="product">Filtrar...</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
        <option value="skincare">Skincare</option>
        <option value="groceries">Groceries</option>
        <option value="home-decoration">Home Decoration</option>
        <option value="furniture">Furniture</option>
        <option value="tops">Tops</option>
        <option value="womens-dresses">Women&apos;s Dresses</option>
        <option value="womens-shoes">Women&apos;s Shoes</option>
        <option value="mens-shirts">Men&apos;s Shirts</option>
        <option value="mens-shoes">Men&apos;s Shoes</option>
        <option value="mens-watches">Men&apos;s Watches</option>
        <option value="womens-watches">Women&apos;s Watches</option>
        <option value="womens-bags">Women&apos;s Bags</option>
        <option value="womens-jewellery">Women&apos;s Jewellery</option>
        <option value="sunglasses">Sunglasses</option>
        <option value="automotive">Automotive</option>
        <option value="motorcycle">Motorcycle</option>
        <option value="lighting">Lighting</option>
      </select>
    </div>
  );
};

export default Filter;
