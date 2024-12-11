// src/interfaces/models/string;

import { User } from "firebase/auth";

export type Role = "admin" | "mod" | "user" | null
// Users can be registered towards an entity (business/fundacion)
export interface UserEntityMembership {
    entityDisplayName: string;
    role: string;
    entityId: string;
    entityType: string;
}

// Users can be registered towards an event (campaign/fundraiser)
export interface UserEventMembership {
    entityId: string;
    role: Role;
    startDate: Date;
    endDate: Date | null;
}

/*
FirebaseUser

accessToken: string
auth: AuthImpl
displayName: string
email: string
emailVerified: bool
isAnonymous: bool
metadata: {
    createdAt: timestamp
    creationTime: Date
    lastLoginAt: timestamp
    lastSignInTime: Date
}
phoneNumer: string
photoURL : string
proactiveRefresh: ProactiveRefresh
providerData: string
providerId: string
tenantId: string
uid: string
*/

export interface UNPUser {
    role: Role; // Can be 'admin', 'org', etc.
    creationTime: string | undefined;
    lastSignInTime: string | undefined;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    phoneNumber: string | null;
    photoURL: string | null;
    userId: string;
    memberships?: UserEntityMembership[]
}
