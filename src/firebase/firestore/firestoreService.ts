// src/firebase/firestore/firestoreService.ts
import { collection, addDoc, getDocs, getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

// Add a new document to a collection
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

// Get all documents from a collection
export const getAllDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};

// Get a single document by ID
export const getDocumentById = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error('Error fetching document:', error);
  }
};

// Update a document by ID
export const updateDocument = async (collectionName: string, docId: string, updatedData: any) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await setDoc(docRef, updatedData, { merge: true });
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

// Delete a document by ID
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(firestore, collectionName, docId));
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};
