import { SchoolDataType } from "@/types/recruitTypes";
import { useEffect, useState } from "react";

type schoolDataFilterType = {
    schoolName: string;
    yearStart: number;
    yearEnd: number;
  }

const useSchoolData = ({schoolName, yearStart, yearEnd}: schoolDataFilterType) => {
  const [data, setData] = useState<SchoolDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if(schoolName) {
        setLoading(true);
        setError(false);
        fetch("http://127.0.0.1:8000/recruits", {
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
            setData(null);
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
    }
    else {
        setData(null);
        setLoading(false);
        setError(false);
    }
  }, [schoolName]);

  return { data, loading, error };
};

export default useSchoolData;
