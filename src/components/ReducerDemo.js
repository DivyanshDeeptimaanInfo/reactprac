import React, { useEffect, useReducer, useState } from "react";

let initailState = { likes: 0, dislikes: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "like":
      return { likes: state.likes + 1, dislikes: state.dislikes };
    case "dislike":
      return { dislikes: state.dislikes + 1, likes: state.likes };
    default:
      return "Action Unkown";
  }
}
const ReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, initailState);
    const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https:fakestoreapi.com/products/2")
      .then((res) => res.json())
      .then((datum) => {
        setProduct(datum);
      });
  });

  return (
    <div className=" container-fluid">
      <h2>Product Details</h2>
      <div className="card p-2" style={{ width: "200px" }}>
        <img
          src={product.image}
          alt={product.image}
          className=" card-img-top"
          height="160"
        />
        <div className="card-header">
          <p>{product.title}</p>
        </div>
        <div className="card-footer">
          <h2>Likes Counter </h2>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch({ type: "like" });
              }}
            >
              <span className="bi bi-hand-thumbs-up"></span>[{state.likes}]
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch({ type: "dislike" });
              }}
            >
              <span className="bi bi-hand-thumbs-down"></span>[{state.dislikes}]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReducerDemo;
