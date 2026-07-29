// src/modules/auth/auth.types.ts

import { UserRole } from "@prisma/client";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  branchId: string | null;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequestUser extends AuthUser {
  iat?: number;
  exp?: number;
}