import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useCaptcha } from "../hooks/useCaptcha";
import {useCaptchaWithRegen} from "../hooks/useCaptchaWithRegen"

const CustomHookDemo = () => {
  const { data } = useFetchData("https://fakestoreapi.com/products/3");
  const code = useCaptcha();

  const { captcha, regenerate } = useCaptchaWithRegen();
  console.log(captcha)
    
  return (
    <div className="container-fluid">
      <div className="card w-50">
        <div className=" card-header">
          <h1>{data.title}</h1>
        </div>
        <div className="card-body">
          <img
            src={data.image}
            alt={data.image}
            className="card-img-top w-25"
            height="160"
          />
        </div>
        <p>{code.code}</p>
        <div>
          <h2>Captcha: {captcha}</h2>
          <button onClick={regenerate}>Refresh Captcha</button>
        </div>
      </div>
    </div>
  );
};

export default CustomHookDemo;
