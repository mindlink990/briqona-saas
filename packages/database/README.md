# Database package

Database layer for the multi-tenant SaaS core.

Core model:
- Tenant
- Workspace
- User
- Membership
- Role
- Permission
- Module
- Subscription
- AuditLog

Tenant isolation will be enforced at the application/data-access layer and later backed by database policies where supported.
