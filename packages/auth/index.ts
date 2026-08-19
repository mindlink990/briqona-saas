export type UserRole = "platform_admin" | "tenant_owner" | "admin" | "member";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
};
