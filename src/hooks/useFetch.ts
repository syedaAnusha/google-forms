/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

interface UseFetchResult {
  data: any | null;
  response: any | null;
}

const useFetch = (url: string): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
  const [response, setResponse] = useState<any | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error fetching data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          const resp = data.map((item: any) => item.responses);
          setResponse(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, [url]);

  return { data, response };
};

export default useFetch;
