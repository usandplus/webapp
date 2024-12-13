// src/interfaces/models/string;

import { User } from "firebase/auth";
import { UNPBasePrivateUser, UNPBasePublicUser, UNPBaseUser } from "./common";

export type Role = "admin" | "mod" | "collab" | "user" | null

export interface UserEntityMembership {
    entityDisplayName: string;
    role: string;
    entityId: string;
    entityType: string;
}

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

export interface UNPUser extends UNPBaseUser{
    memberships?: UserEntityMembership[]
    private: UNPBasePrivateUser
    public: UNPBasePublicUser
}
