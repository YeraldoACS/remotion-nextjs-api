import { db } from "@app/firebase/client/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FetchDocFromQuery } from "../lib/types";

export default function useFetchDocsFromQuery({ path, orderByVal, condition: { val: conditionVal, comparison: conditionComparison, field: conditionField }, limitN }: FetchDocFromQuery) {
  const [data, setData] = useState<{} | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = collection(db, path);
        const q = query(docRef, where(conditionField, conditionComparison, conditionVal), orderBy(orderByVal), limit(limitN));
        const docSnap = await getDocs(q);
        setData(docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err: any) {
        setError({
          message: err.message || "Could not fetch Document.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
}
