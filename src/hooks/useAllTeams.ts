import { useEffect, useState } from "react";

const useAllTeams = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch("http://127.0.0.1:8000/teams", {
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
