import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@app/firebase/client/firebase';
import { UserData } from '@app/src/lib/types';

interface UsePaginatedUserTemplatesResult {
  data: UserData[];
  loading: boolean;
  nextPage: () => void;
  hasNextPage: boolean;
}

export function usePaginatedUserTemplates(limitPerPage = 10): UsePaginatedUserTemplatesResult {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadVideos = (startDoc?: QueryDocumentSnapshot<DocumentData>) => {
    setLoading(true);

    let baseQuery = query(
      collection(db, 'userTemplates'),
      orderBy('createdAt', 'desc'),
      limit(limitPerPage)
    );

    if (startDoc) {
      baseQuery = query(baseQuery, startAfter(startDoc));
    }

    const unsubscribe = onSnapshot(baseQuery, snapshot => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserData));
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasNextPage(snapshot.docs.length === limitPerPage);
      setData(prev => (startDoc ? [...prev, ...docs] : docs));
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = loadVideos();
    return () => unsubscribe();
  }, []);

  const nextPage = () => {
    if (lastDoc && hasNextPage) {
      loadVideos(lastDoc);
    }
  };

  return {
    data,
    loading,
    nextPage,
    hasNextPage,
  };
}
