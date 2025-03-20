import { useState, useEffect } from "react";

export function useCaptchaWithRegen() {
  const [captcha, setCaptcha] = useState("");

  // Function to generate a new captcha
  const generateCaptcha = () => {
    const newCaptcha = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join(" ");
    setCaptcha(newCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return { captcha, regenerate: generateCaptcha };
}
