import { useState, useEffect } from "react";

export function useFetchData(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json)
      .then((datum) => setData(datum))
      .catch((exception) => {
        console.error(exception);
      });
  }, [url]);
  return { data };
}
