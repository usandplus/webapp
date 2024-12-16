import { doc, getDoc } from "firebase/firestore";
import { UNPBasePublicUser } from "../../types/models/common";
import { firestore } from "../firebaseConfig";
import { getDocumentById } from "../firestore/firestoreService";

export async function getUserProfile(userId: string): Promise<UNPBasePublicUser> {
  if (!userId) {
    throw new Error('User ID is required to fetch profile.');
  }

  const docRef = doc(firestore, 'users', userId, 'public', 'info');
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`No public info found for user with ID ${userId}`);
  }
  const data = docSnap.data() as UNPBasePublicUser;

  return data;
}