export interface DomainParts {
  schoolSlug?: string;
  module?: string;
  baseDomain: string;
  isCustomDomain: boolean;
}

export function extractSchoolSlugFromHost(host: string): DomainParts {
  // Remove port if present
  const hostWithoutPort = host.split(':')[0];
  
  // Handle localhost development
  if (hostWithoutPort === 'localhost' || hostWithoutPort === '127.0.0.1') {
    return {
      baseDomain: 'localhost',
      isCustomDomain: false,
    };
  }

  const parts = hostWithoutPort.split('.');
  
  // Handle custom domains (e.g., school.com)
  if (parts.length === 2) {
    return {
      schoolSlug: parts[0],
      baseDomain: parts.slice(-2).join('.'),
      isCustomDomain: true,
    };
  }
  
  // Handle subdomains (e.g., portal.school.murnovakonect.com)
  if (parts.length >= 3) {
    const baseDomain = parts.slice(-2).join('.');
    const subdomainParts = parts.slice(0, -2);
    
    // Check if this is a module subdomain (e.g., timetable.school.murnovakonect.com)
    const moduleSubdomains = ['portal', 'timetable', 'homework', 'attendance', 'results', 'payments'];
    
    if (subdomainParts.length === 2 && moduleSubdomains.includes(subdomainParts[0])) {
      return {
        module: subdomainParts[0],
        schoolSlug: subdomainParts[1],
        baseDomain,
        isCustomDomain: false,
      };
    }
    
    // Regular school subdomain (e.g., school.murnovakonect.com)
    if (subdomainParts.length === 1) {
      return {
        schoolSlug: subdomainParts[0],
        baseDomain,
        isCustomDomain: false,
      };
    }
  }
  
  // Fallback - no school slug detected
  return {
    baseDomain: hostWithoutPort,
    isCustomDomain: false,
  };
}
