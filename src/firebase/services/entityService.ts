// src/firebase/firestore/entityService.ts
import { collection, doc, FieldValue, getDoc, getDocs, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { UNPBaseEntityType } from '../../types/models/common';
import { addDocument, getDocumentById, updateDocument, deleteDocument, getAllDocuments } from '../firestore/firestoreService';
import { firestore } from '../firebaseConfig';
import { Role, UserEntityMembership } from '../../types/models/User';

interface EntityRequestData {
  name: string;
  displayName: string;
  email: string;
  rfc: string;
  type: string; // e.g., 'fundacion', 'campaign', etc.
  createdBy: string; // User ID of the creator
  ownerId: string;
  ownerDisplayName: string;
}

interface EntityStarterPublicData {
  name: string;
  displayName: string;
  createdAt: FieldValue;
  lastUpdatedAt: FieldValue;
  entityId: string;
}

interface EntityStarterPrivateData {
  rfc: string;
  ownerId: string;
  createdBy: string;
  entityId: string;
}

export const EntityService = {// Create a new entity
  createEntity: async (
    ownerId: string,
    entityType: UNPBaseEntityType,
    entityData: EntityRequestData
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const exists = await EntityService.checkEntityExists(entityData.rfc)
      if (exists) {
        throw new Error('RFC ya registrado en Us & Plus')
      }
      const newEntityId = await addDocument(entityType, {}); // Create placeholder document to generate ID
      if (!newEntityId) {
        throw new Error('Failed to generate a new entity ID.');
      }

      console.log('Entity created with ID:', newEntityId);

      const newEntityPublicData: EntityStarterPublicData = {
        name: entityData.name,
        displayName: entityData.displayName,
        createdAt: serverTimestamp(),
        lastUpdatedAt: serverTimestamp(),
        entityId: newEntityId,
      };

      const newEntityPrivateData: EntityStarterPrivateData = {
        rfc: entityData.rfc,
        ownerId: ownerId,
        createdBy: ownerId,
        entityId: newEntityId,
      };

      await addDocument(`${entityType}/${newEntityId}/public`, newEntityPublicData, 'info');
      await addDocument(`${entityType}/${newEntityId}/private`, newEntityPrivateData, 'info');
      await EntityService.addAdmin(entityType, newEntityId, ownerId, entityData.displayName, entityData.ownerDisplayName);

      return { success: true, message: newEntityId };
    } catch (error: any) {
      console.error('Error creating entity:', error);
      return { success: false, message: error.message || 'Unknown error occurred.' };
    }
  },


  // Add a user as an admin to the entity
  addAdmin: async (entityType: UNPBaseEntityType, entityId: string, userId: string, entityDisplayName: string, userDisplayName: string) => {
    try {
      const adminPath = `${entityType}/${entityId}/private/members/admins`;
      const userMembershipPath = `users/${userId}/private/memberships/admin`;

      // Add the admin to the entity's members subcollection
      await addDocument(adminPath, { userId, role: 'admin', userDisplayName }, userId);

      // Add the membership to the user's private memberships
      await addDocument(userMembershipPath, { entityId, role: 'admin', entityType, entityDisplayName }, entityId);

      console.log('Admin added to entity:', entityId);
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  },

  // Remove a user from the admins of the entity
  removeAdmin: async (entityType: UNPBaseEntityType, entityId: string, userId: string) => {
    try {
      const adminPath = `${entityType}/${entityId}/private/members/admins/`;
      const userMembershipPath = `users/${userId}/private/memberships/admin`;

      // Remove the admin from the entity's members subcollection
      await deleteDocument(adminPath, userId);

      // Remove the membership from the user's private memberships
      await deleteDocument(userMembershipPath, entityId);

      console.log('Admin removed from entity:', entityId);
    } catch (error) {
      console.error('Error removing admin:', error);
    }
  },

  // Add a user as a member to the entity
  addMember: async (entityType: UNPBaseEntityType, entityId: string, userId: string, role: Role) => {
    try {
      const memberPath = `${entityType}/${entityId}/private/members/users`;
      const userMembershipPath = `users/${userId}/private/memberships/user`;

      // Add the member to the entity's members subcollection
      await addDocument(memberPath, { userId, role: role }, userId);

      // Add the membership to the user's private memberships
      await addDocument(userMembershipPath, { entityId, role: 'member', entityType }, entityId);

      console.log('Member added to entity:', entityId);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  },

  // Remove a user from the members of the entity
  removeMember: async (entityType: UNPBaseEntityType, entityId: string, userId: string) => {
    try {
      const memberPath = `${entityType}/${entityId}/private/members/users`;
      const userMembershipPath = `users/${userId}/private/memberships/user`;

      // Remove the member from the entity's members subcollection
      await deleteDocument(memberPath, userId);

      // Remove the membership from the user's private memberships
      await deleteDocument(userMembershipPath, entityId);

      console.log('Member removed from entity:', entityId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  },

  // Delete an entity
  deleteEntity: async (collectionPath: string, entityId: string) => {
    try {
      await deleteDocument(collectionPath, entityId);
      console.log('Entity deleted:', entityId);
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  },

  // Fetch all entities
  getAllEntities: async (collectionPath: string) => {
    try {
      const entities = await getAllDocuments(collectionPath);
      console.log('Fetched entities:', entities);
      return entities;
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  },

  // Fetch a single entity
  getEntityById: async (collectionPath: string, entityId: string) => {
    try {
      const entity = await getDocumentById(collectionPath, entityId);
      console.log('Fetched entity:', entity);
      return entity;
    } catch (error) {
      console.error('Error fetching entity:', error);
    }
  },

  findDocumentByRFC: async (rfcValue: string, collectionName: UNPBaseEntityType): Promise<any> => {
    try {
      // Step 1: Get all parent documents in the main collection
      const parentCollectionRef = collection(firestore, collectionName);
      const parentDocs = await getDocs(parentCollectionRef);

      // Step 2: Iterate over each parent document to query its `private/info` subcollection
      for (const parentDoc of parentDocs.docs) {
        const parentDocId = parentDoc.id;
        const subCollectionRef = collection(firestore, `${collectionName}/${parentDocId}/private`);

        // Query the `info` document for the given RFC value
        const infoDocRef = doc(subCollectionRef, 'info');
        const infoDocSnap = await getDoc(infoDocRef);

        if (infoDocSnap.exists() && infoDocSnap.data()?.rfc === rfcValue) {
          console.log('Matching document found:', infoDocSnap.data());
          return infoDocSnap.data(); // Return the matching document
        }
      }

      console.log('No document found with the given RFC value.');
      return null;
    } catch (error) {
      console.error('Error querying Firestore:', error);
      throw error;
    }
  },

  checkEntityExists: async (rfc: string) => {
    try {
      const fundaciones = await EntityService.findDocumentByRFC(rfc, 'fundacion');
      const ac = await EntityService.findDocumentByRFC(rfc, 'ac');
      const businesses = await EntityService.findDocumentByRFC(rfc, 'empresa');

      if (!fundaciones && !ac && !businesses) return false;
      return true;
    } catch (error) {
      console.error('Error checking entity existence:', error);
      throw error;
    }
  },
  getAllUserMemberships:async (userId: string): Promise<UserEntityMembership[]> =>{
    try {

      // Paths for both collections
      const adminMembershipsCollection = collection(
        firestore,
        `users/${userId}/private/memberships/admin`
      );
      const userMembershipsCollection = collection(
        firestore,
        `users/${userId}/private/memberships/user`
      );

      // Queries for both collections
      const adminMembershipsQuery = query(adminMembershipsCollection);
      const userMembershipsQuery = query(userMembershipsCollection);

      // Fetch documents from both collections concurrently
      const [adminSnapshot, userSnapshot] = await Promise.all([
        getDocs(adminMembershipsQuery),
        getDocs(userMembershipsQuery),
      ]);


      // Map over the snapshots to construct arrays of documents
      const adminMemberships: UserEntityMembership[] = adminSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          entityDisplayName: data.entityDisplayName || "",
          role: data.role || "",
          entityId: data.entityId || "",
          entityType: data.entityType || "",
        };
      });

      const userMemberships: UserEntityMembership[] = userSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          entityDisplayName: data.entityDisplayName || "",
          role: data.role || "",
          entityId: data.entityId || "",
          entityType: data.entityType || "",
        };
      });

      // Merge the results from both collections
      const allMemberships = [...adminMemberships, ...userMemberships];
      console.log(allMemberships)
      return allMemberships;
    } catch (error) {
      console.error("Error fetching user memberships:", error);
      throw error; // Rethrow the error for upstream handling
    }
  },
  getUserProfile: async (userId: string): Promise<any> => {
    try {
      // Reference to the user's public profile document
      const profileRef = doc(firestore, `users/${userId}/public/profile`);

      // Fetch the document snapshot
      const profileSnapshot = await getDoc(profileRef);

      if (profileSnapshot.exists()) {
        const profileData = profileSnapshot.data();
        console.log('Fetched user profile:', profileData);
        return profileData;
      } else {
        console.log('No profile found for user:', userId);
        return null; // Return null if the profile doesn't exist
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile.');
    }
  },
  getEntityProfile: async (entityType: string, entityId: string): Promise<any> => {
    try {
      // Reference to the user's public profile document
      const profileRef = doc(firestore, `${entityType}/${entityId}/public/profile`);

      // Fetch the document snapshot
      const profileSnapshot = await getDoc(profileRef);

      if (profileSnapshot.exists()) {
        const profileData = profileSnapshot.data();
        console.log(`Fetched ${profileData.displayName} profile:`, profileData);
        return profileData;
      } else {
        console.log('No profile found for user:', entityId);
        return null; // Return null if the profile doesn't exist
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile.');
    }
  },
};
