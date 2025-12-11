export interface CreateSchoolDto {
  name: string;
  slug: string;
  domain?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  motto?: string;
  tagline?: string;
  vision?: string;
}

export interface UpdateSchoolDto {
  name?: string;
  slug?: string;
  domain?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  motto?: string;
  tagline?: string;
  vision?: string;
}

export interface TenantContext {
  schoolId: string;
  schoolSlug: string;
  domain: string;
}

export interface SchoolWithBranding {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  motto?: string;
  tagline?: string;
  vision?: string;
  branding?: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    motto?: string;
    tagline?: string;
    headerImage?: string;
    faviconUrl?: string;
  };
}
