// firebase/admin/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp(); // Use default credentials (emulators or local service account)
}

export const firestore = getFirestore();
