import { db } from "@app/firebase/client/firebase";
import { collection, getDocs, limit, orderBy, query, where, WhereFilterOp } from "firebase/firestore";
import { FetchDocFromQuery } from "./types";

export async function fetchDocs({ path }: { path: string }) {
    try {
        const docRef = collection(db, path);
        const q = query(docRef);
        const docSnap = await getDocs(q);
        return {
            ok: true,
            data: docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        };
    } catch (err: any) {
        return { ok: false, data: [] };
    }
}

export async function fetchDocFromQuery({
    path,
    orderByVal,
    condition: {
        val: conditionVal,
        comparison: conditionComparison,
        field: conditionField,
    },
    limitN
}: FetchDocFromQuery) {
    try {
        const docRef = collection(db, path);
        const q = query(docRef, where(conditionField, conditionComparison, conditionVal), orderBy(orderByVal), limit(limitN));
        const docSnap = await getDocs(q);
        return {
            ok: true,
            data: docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        };
    } catch (err: any) {
        return { ok: false, data: [] };
    }
}
