import { useEffect } from "react";
import { mutate } from "swr";

let liveQueries = new Set();

export function trackLiveQueries(useSWRNext: any) {
  return (key: any, fetcher: any, config: any) => {
    const swr = useSWRNext(key, fetcher, config);

    // console.log("QUERIES", { liveQueries });

    useEffect(() => {
      liveQueries.add(key);

      return () => {
        liveQueries.delete(key);
      };
    }, [key]);

    return swr;
  };
}

export const revalidateQueries = () => {
  let promises = [...liveQueries.values()].map((key: any) => mutate(key));
  return Promise.all(promises);
}; // use on crud methods
