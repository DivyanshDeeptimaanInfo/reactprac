import { useState, useEffect } from "react";

export function useCaptcha() {
  const [code, setCode] = useState([]);
  useEffect(() => {
    let first = Math.random() * 10;
    let second = Math.random() * 10;
    let third = Math.random() * 10;
    let forth = Math.random() * 10;
    let fifth = Math.random() * 10;
    let sixth = Math.random() * 10;
    setCode(
      `${Math.round(first)} ${Math.round(second)} ${Math.round(
        third
      )} ${Math.round(forth)} ${Math.round(fifth)} ${Math.round(sixth)}`
    );
  }, []);
  return { code };
}
