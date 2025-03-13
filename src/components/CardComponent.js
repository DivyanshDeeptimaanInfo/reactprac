import React from 'react'

export const CardComponent = (prop) => {
  return (
    <div className="card m-2 p-2" style={{ width: "200px" }}>
      <img
        src={prop.product.image}
        alt={prop.image.image}
        className=" card-img-top"
        height="160"
      />
      <div className=" card-header" style={{ height: "160" }}>
        <p>{prop.product.title}</p>
      </div>
    </div>
  );
}


