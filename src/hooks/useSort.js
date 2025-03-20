// import { useEffect, useState } from "react";

// export const useSort = () => {
//   const [datum, setDatum] = useState(["B", "A", "F", "C", "P"]);
//   useEffect(() => {
//       setDatum([...datum].sort());
    
//   }, []);
//   return { datum };
// };


import { useEffect, useState } from "react";

export const useSort = () => {
  const [datum, setDatum] = useState(["B", "A", "F", "C", "P"]);
  useEffect(() => {
    setDatum((prevDatum) => [...prevDatum].sort()); // Functional update
  }, []); // No dependencies needed

  return { datum };
};
