import { SchoolDataType } from "@/types/recruitTypes";
import { useEffect, useState } from "react";

const useSchoolData = (schoolName: string, yearStart: number, yearEnd: number, retryFlag: boolean) => {
  const [data, setData] = useState<SchoolDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (schoolName) {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/recruits`);
      url.searchParams.append("schoolName", schoolName);
      url.searchParams.append("yearStart", yearStart.toString());
      url.searchParams.append("yearEnd", yearEnd.toString());

      setLoading(true);
      setError(false);

      fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
        .then(async (resp) => {
          if (!resp.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await resp.json();
          setData(jsonData);
        })
        .catch(() => {
          setData(null);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setData(null);
      setLoading(false);
      setError(false);
    }
  }, [schoolName, yearStart, yearEnd, retryFlag]);

  return { data, loading, error };
};

export default useSchoolData;
