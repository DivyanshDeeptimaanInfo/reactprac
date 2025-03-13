import React, { useState, useEffect } from "react";
import { CardComponent } from "./CardComponent";

const ShoppingWithProps = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  function loadCoategories() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        // data.unshift("All");
        setCategories(["All", ...data]);
      });
  }

  function loadProducts(url) {
    fetch(url)
      .then((res) => res.json())
      .then((datum) => setProducts(datum));
  }

  useEffect(() => {
    loadCoategories();
    loadProducts("https://fakestoreapi.com/products");
  });

  function handleCategoryChange(e) {
    // alert(e.target.value);
    if (e.target.value === "All") {
      loadProducts("https://fakestoreapi.com/products");
    } else {
      loadProducts(
        `https://fakestoreapi.com/products/category/${e.target.value}`
      );
    }
  }

  return (
    <div className=" container-fluid">
      <header className="text-center bg-danger p-2 text-white">
        <h1>Shopping Home</h1>
      </header>
      <section className="row">
        <nav className=" col-3">
          <div>
            <label>Select a Category</label>
            <div>
              <select onChange={handleCategoryChange} className="form-select">
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>
        <main
          className=" col-6 d-flex flex-wrap overflow-auto"
          style={{ height: "600px" }}
        >
          {products.map((product) => (
            <CardComponent key={product.id} product={product} />
          ))}
        </main>
      </section>
    </div>
  );
};

export default ShoppingWithProps;
