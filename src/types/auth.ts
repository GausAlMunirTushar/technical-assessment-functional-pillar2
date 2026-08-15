export type UserRole = "admin" | "manager";

export const DEFAULT_USER_ROLE: UserRole = "admin";

export function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "manager";
}
