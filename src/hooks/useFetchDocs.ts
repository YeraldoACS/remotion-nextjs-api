import { db } from "@app/firebase/client/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

interface FetchDocsProps {
  path: string;
}

export default function useFetchDocs({ path }: FetchDocsProps) {
  const [data, setData] = useState<{}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = collection(db, path);
        const q = query(docRef);
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
