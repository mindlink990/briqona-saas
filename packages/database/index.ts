export type Tenant = {
  id: string;
  name: string;
  slug: string;
};

export type Workspace = {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
};
