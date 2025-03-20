import React from "react";
import { useSort } from "../hooks/useSort";
import { useConvert } from "../hooks/useConvert";

const CustomHookDemo2 = () => {
  const code = useSort();
  // console.log(code)
    const s = useConvert();
    return <div>{code.datum} { s.words}</div>;
};

export default CustomHookDemo2;
