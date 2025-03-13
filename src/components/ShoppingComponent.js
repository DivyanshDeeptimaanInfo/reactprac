import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ShoppingComponent = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load categories from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data]));

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Handle category selection
  function handleCategoryChange(e) {
    const category = e.target.value;
    const url =
      category === "All"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  // Add to Cart (each item gets unique cartId)
  // function handleAddToCart(product) {
  //   const newCartItem = { ...product, cartId: uuidv4(), quantity: 1 };

  //   setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
  //   setTotal((prevTotal) => prevTotal + product.price);
  // }

  function handleAddToCart(product) {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if item already exists
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with a unique cartId and quantity 1
        return [
          ...prevCartItems,
          { ...product, cartId: uuidv4(), quantity: 1 },
        ];
      }
    });

    // Update total price
    setTotal((prevTotal) => prevTotal + product.price);
  }

  // Remove single item from cart using cartId
  function handleDelete(cartId) {
    setCartItems((prevCartItems) => {
      return prevCartItems
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });

    // Ensure total price is correctly updated
    const itemToDelete = cartItems.find((item) => item.cartId === cartId);
    if (itemToDelete) {
      setTotal((prevTotal) => Math.max(0, prevTotal - itemToDelete.price));
    }
  }

  // Remove all items from cart
  function handleRemoveAll() {
    setCartItems([]);
    setTotal(0);
  }

  return (
    <div className="container-fluid">
      <header className="text-center bg-danger p-2 text-white">
        <h1>Shopping Home</h1>
      </header>

      <section className="row">
        {/* Sidebar for Category Selection */}
        <nav className="col-3">
          <div>
            <label>Select a Category</label>
            <select onChange={handleCategoryChange} className="form-select">
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </nav>

        {/* Product Listing */}
        <main
          className="col-6 d-flex flex-wrap overflow-auto"
          style={{ height: "600px" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="card p-2 m-2"
              style={{ width: "200px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top"
                height={160}
              />
              <div className="card-header">
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>${product.price}</dd>
                  <dt>Rating</dt>
                  <dd>
                    <span className="bi bi-star-fill text-success">
                      {product.rating.rate} [{product.rating.count}]
                    </span>
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-danger w-100"
                >
                  <span className="bi bi-cart4"></span> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Cart Section */}
        <aside className="col-3">
          <button className="btn btn-warning w-100">
            <span className="bi bi-cart3"></span> [{cartItems.length}] Your Cart
            Items
          </button>

          {cartItems.length > 0 && (
            <table className="table table-hover mt-2">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Preview</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.cartId}>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.cartId)}
                        className="btn btn-danger"
                      >
                        <span className="bi bi-trash"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>${total.toFixed(2)}</strong>
                  </td>
                  <td colSpan="3">
                    <button
                      onClick={handleRemoveAll}
                      className="btn btn-danger w-100"
                    >
                      Remove All
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </aside>
      </section>
    </div>
  );
};

export default ShoppingComponent;

// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

// const ShoppingComponent = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   // Load categories from API
//   function loadCategories() {
//     fetch("https://fakestoreapi.com/products/categories")
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(["All", ...data]);
//       });
//   }

//   // Load products from API
//   function loadProducts(url) {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }

//   // Initial data load
//   useEffect(() => {
//     loadCategories();
//     loadProducts("https://fakestoreapi.com/products");
//   }, []);

//   // Handle category selection
//   function handleCategoryChange(e) {
//     const category = e.target.value;
//     if (category === "All") {
//       loadProducts("https://fakestoreapi.com/products");
//     } else {
//       loadProducts(`https://fakestoreapi.com/products/category/${category}`);
//     }
//   }

//   // // Add to cart with unique ID
//   // function handleAddToCart(product) {
//   //   const newCartItem = { ...product, cartId: uuidv4() }; // Unique cart ID
//   //   setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
//   //   setTotal((prevTotal) => prevTotal + newCartItem.price);
//   // }

// function handleAddToCart(product) {
//   setCartItems((prevCartItems) => {
//     const existingItem = prevCartItems.find((item) => item.id === product.id);

//     if (existingItem) {
//       // Increase quantity if item already exists
//       return prevCartItems.map((item) =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       // Add new item with a unique cartId and quantity 1
//       return [...prevCartItems, { ...product, cartId: uuidv4(), quantity: 1 }];
//     }
//   });

//   // Update total price
//   setTotal((prevTotal) => prevTotal + product.price);
// }

//   // // Remove a single item from cart
//   // function handleDelete(cartId) {
//   //   setCartItems((prevCartItems) =>
//   //     prevCartItems.filter((item) => item.cartId !== cartId)
//   //   );

//   // }

//   // function handleDelete(cartId) {
//   //   setCartItems((prevCartItems) => {
//   //     // Find the item to be deleted
//   //     const itemToDelete = prevCartItems.find((item) => item.cartId === cartId);

//   //     if (!itemToDelete) return prevCartItems; // Safety check

//   //     // Calculate the new total before updating cart
//   //     setTotal((prevTotal) => prevTotal - itemToDelete.price);

//   //     // Remove the item from the cart
//   //     return prevCartItems.filter((item) => item.cartId !== cartId);
//   //   });
//   // }

// function handleDelete(cartId) {
//   setCartItems((prevCartItems) => {
//     // Find the item to delete
//     const itemToDelete = prevCartItems.find((item) => item.cartId === cartId);
//     if (!itemToDelete) return prevCartItems; // Avoid errors if not found

//     // Update cart by removing only the clicked instance
//     const updatedCart = prevCartItems.filter((item) => item.cartId !== cartId);

//     // Update total price correctly
//     setTotal((prevTotal) => ( prevTotal - itemToDelete.price));

//     return updatedCart;
//   });
// }

//   // Remove all items from cart
//   function handleRemoveAll() {
//     setCartItems([]); // Clear cart
//     setTotal(0);
//   }

//   return (
//     <div className="container-fluid">
//       <header className="text-center bg-danger p-2 text-white">
//         <h1>Shopping Home</h1>
//       </header>

//       <section className="row">
//         {/* Sidebar for Category Selection */}
//         <nav className="col-3">
//           <div>
//             <label>Select a Category</label>
//             <select onChange={handleCategoryChange} className="form-select">
//               {categories.map((category) => (
//                 <option value={category} key={category}>
//                   {category.toUpperCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </nav>

//         {/* Product Listing */}
//         <main
//           className="col-6 d-flex flex-wrap overflow-auto"
//           style={{ height: "600px" }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="card p-2 m-2"
//               style={{ width: "200px" }}
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="card-img-top"
//                 height={160}
//               />
//               <div className="card-header">
//                 <p>{product.title}</p>
//               </div>
//               <div className="card-body">
//                 <dl>
//                   <dt>Price</dt>
//                   <dd>${product.price}</dd>
//                   <dt>Rating</dt>
//                   <dd>
//                     <span className="bi bi-star-fill text-success">
//                       {product.rating.rate} [{product.rating.count}]
//                     </span>
//                   </dd>
//                 </dl>
//               </div>
//               <div className="card-footer">
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="btn btn-danger w-100"
//                 >
//                   <span className="bi bi-cart4"></span> Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </main>

//         {/* Cart Section */}
//         <aside className="col-3">
//           <button className="btn btn-warning w-100">
//             <span className="bi bi-cart3"></span> [{cartItems.length}] Your Cart
//             Items
//           </button>

//           {/* Cart Items Table */}
//           {cartItems.length > 0 && (
//             <table className="table table-hover mt-2">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Price</th>
//                   <th>Preview</th>
//                   <th>
//                     <button
//                       onClick={handleRemoveAll}
//                       className="btn btn-danger"
//                     >
//                       Remove All
//                     </button>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.cartId}>
//                     <td>{item.title}</td>
//                     <td>${item.price}</td>
//                     <td>
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         width="50"
//                         height="50"
//                       />
//                     </td>
//                     <td>{item.quantity}</td>
//                     <td>
//                       <button
//                         onClick={() => handleDelete(item.cartId)}
//                         className="btn btn-danger"
//                       >
//                         <span className="bi bi-trash"></span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//               <tfoot>
//                 <tr>
//                   <td>Total</td>
//                   <td>{total}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           )}
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default ShoppingComponent;

// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

// const ShoppingComponent = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [itemsCount, setItemsCount] = useState(0);

//   function getCartItemsCount() {
//     setItemsCount(cartItems.length);
//   }

//   function loadCoategories() {
//     fetch("https://fakestoreapi.com/products/categories")
//       .then((res) => res.json())
//       .then((data) => {
//         // data.unshift("All");
//         setCategories(["All", ...data]);
//       });
//   }

//   function loadProducts(url) {
//     fetch(url)
//       .then((res) => res.json())
//       .then((datum) => setProducts(datum));
//   }

//   useEffect(() => {
//     loadCoategories();
//     loadProducts("https://fakestoreapi.com/products");
//     setItemsCount(cartItems.length);
//   }, [cartItems]);

//   function handleCategoryChange(e) {
//     // alert(e.target.value);
//     if (e.target.value === "All") {
//       loadProducts("https://fakestoreapi.com/products");
//     } else {
//       loadProducts(
//         https://fakestoreapi.com/products/category/${e.target.value}
//       );
//     }
//   }

//   function handleAddtoCart(e) {
//     // alert(e.target.id);
//     fetch(https://fakestoreapi.com/products/${e.target.id})
//       .then((res) => res.json())
//       .then((datum) =>
//         setCartItems((prevCartItems) => [datum, ...prevCartItems])
//       );
//     getCartItemsCount();
//   }

//   function handleDelete(productId) {
//     setCartItems((prevCartItems) =>
//       prevCartItems.filter((item) => item.id !== productId)
//     );
//   }

//   function handleRemoveAll() {
//     setCartItems([]); // Clears the cart
//     setItemsCount(0); // Resets item count
//   }

//   return (
//     <div className=" container-fluid">
//       <header className="text-center bg-danger p-2 text-white">
//         <h1>Shopping Home</h1>
//       </header>
//       <section className="row">
//         <nav className=" col-3">
//           <div>
//             <label>Select a Category</label>
//             <div>
//               <select onChange={handleCategoryChange} className="form-select">
//                 {categories.map((category) => (
//                   <option value={category} key={category}>
//                     {category.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </nav>
//         <main
//           className=" col-6 d-flex flex-wrap overflow-auto"
//           style={{ height: "600px" }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className=" card p-2 m-2 "
//               style={{ width: "200px" }}
//             >
//               <img
//                 src={product.image}
//                 alt={product.image}
//                 className=" card-img-top"
//                 height={160}
//               />
//               <div className=" card-header">
//                 <p>{product.title}</p>
//               </div>
//               <div className="card-body">
//                 <dl>
//                   <dt>Price</dt>
//                   <dd>{product.price}</dd>
//                   <dt>Rating</dt>
//                   <dd>
//                     <span className=" bi bi-star-fill text-success">
//                       {product.rating.rate}
//                       <span>[{product.rating.count}]</span>
//                     </span>
//                   </dd>
//                 </dl>
//               </div>
//               <div className=" card-footer">
//                 <button
//                   id={product.id}
//                   onClick={handleAddtoCart}
//                   className="btn btn-danger w-100"
//                 >
//                   <span className=" bi bi-cart4"></span>Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </main>
//         <aside className="col-3">
//           <button className="btn btn-warning w-100">
//             <span className="bi bi-cart3"></span>[{itemsCount}] Your Cart Items
//           </button>
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Preview</th>
//                 <th>
//                   <button onClick={handleRemoveAll} className=" btn btn-danger">
//                     Remove All
//                   </button>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => {
//                 return (
//                   <tr key={uuidv4()}>
//                     <td>{item.title}</td>
//                     <td>{item.price}</td>
//                     <td>
//                       <img
//                         src={item.image}
//                         alt={item.image}
//                         width="50"
//                         height="50"
//                       />
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => handleDelete(item.id)} // Pass product ID directly
//                         className=" btn btn-danger"
//                       >
//                         <span className="bi bi-trash"></span>
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default ShoppingComponent;
