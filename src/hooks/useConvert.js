import { useEffect, useState } from "react";

export const useConvert = () => {
  const [words, setWords] = useState("weLcoMe To reAcT");
  useEffect(() => {
    setWords(
      (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
  },[]);
  return { words };
};
