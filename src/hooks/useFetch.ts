/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

interface UseFetchResult {
  data: any | null;
}

const useFetch = (url: string): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Error fetching users data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, [url]);

  return { data };
};

export default useFetch;
