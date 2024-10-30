// src/services/analyticsService.ts

import { database } from '../firebaseConfig'; // Import the real-time database instance
import { ref, runTransaction } from 'firebase/database'; // Correct imports from Firebase SDK

// Function to track events such as clicks or searches
export const trackEvent = async (
  eventType: string,
  entityId: string,
  entityType: 'org' | 'biz' | 'campaign' | 'fundraiser',
  userId?: string,
  additionalData?: Record<string, any>
) => {
  try {
    // Reference the path in the real-time database (e.g., /analytics/orgId/clicks)
    const eventRef = ref(database, `analytics/${entityType}/${entityId}/${eventType}`);

    // Increment the counter by 1 using a transaction
    await runTransaction(eventRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });

    // Optional: Store additional metadata
    if (additionalData) {
      const metadataRef = ref(database, `analytics/${entityType}/${entityId}/metadata`);
      await runTransaction(metadataRef, (currentData) => ({
        ...currentData,
        ...additionalData,
        lastUpdated: new Date().toISOString(),
      }));
    }

    // Additional actions can be handled here, e.g., sending notifications

  } catch (error) {
    console.error('Error tracking event:', error);
  }
};