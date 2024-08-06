import { useEffect, useState } from "react";

const useAllTeams = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/teams`);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then(async (resp) => {
        setData(await resp.json());
        setError(false);
      })
      .catch(() => {
        setData([]);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useAllTeams;
