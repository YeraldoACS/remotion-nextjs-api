import { db } from "@app/firebase/client/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface FetchDocProps {
  path: string;
  docID: string;
}

export default function useFetchDoc({ path, docID }: FetchDocProps) {
  const [data, setData] = useState<{} | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, path, docID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setError({
            message: `Document with ID ${docID} does not exist.`,
          });
        }
      } catch (err: any) {
        setError({
          message: err.message || "Could not fetch Document.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, docID]);

  return { data, loading, error };
}
