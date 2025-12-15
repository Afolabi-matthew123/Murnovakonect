export interface DomainParts {
  /**
   * Raw host as received in the HTTP request (may include port).
   * Example: "portal.goldsworth.murnovakonect.com:3000"
   */
  host: string;

  /**
   * Base SaaS domain, e.g. "murnovakonect.com".
   * This can be overridden via MURNOVA_BASE_DOMAIN.
   */
  baseDomain: string;

  /**
   * Slug of the school for SaaS-style subdomains:
   * - goldsworth.murnovakonect.com      -> "goldsworth"
   * - admin.goldsworth.murnovakonect.com -> "goldsworth"
   * For pure custom domains (goldsworth.com.ng), this will be undefined
   * and must be resolved by the backend using the database.
   */
  schoolSlug?: string;

  /**
   * Logical module prefix (optional).
   * Examples:
   * - portal.murnovakonect.com              -> "portal"
   * - admin.goldsworth.murnovakonect.com    -> "admin"
   * For pure school subdomains like goldsworth.murnovakonect.com,
   * this will usually be undefined.
   */
  module?: string;

  /**
   * Whether this host looks like a custom domain and not the core SaaS
   * base domain.
   * Example:
   * - murnovakonect.com                    -> false
   * - portal.murnovakonect.com             -> false
   * - goldsworth.murnovakonect.com         -> false
   * - goldsworth.com.ng                    -> true
   * - portal.goldsworth.com                -> true
   */
  isCustomDomain: boolean;
}

/**
 * Default base domain for the SaaS.
 * Can be overridden at runtime via MURNOVA_BASE_DOMAIN env var.
 */
const DEFAULT_BASE_DOMAIN =
  (typeof process !== 'undefined' &&
    process.env &&
    process.env.MURNOVA_BASE_DOMAIN) ||
  'murnovakonect.com';

function normalizeHost(rawHost: string | undefined | null): string {
  if (!rawHost) return '';
  // Strip port, lowercase
  return rawHost.split(':')[0].trim().toLowerCase();
}

/**
 * Returns true if the host belongs to the main SaaS base domain.
 */
function isSaasDomain(host: string, baseDomain: string): boolean {
  if (!host) return false;
  const h = host.toLowerCase();
  const b = baseDomain.toLowerCase();
  return h === b || h.endsWith(`.${b}`);
}

/**
 * Parse a host into DomainParts.
 *
 * This function is intentionally PURE and has no DB knowledge.
 * For custom domains (isCustomDomain = true), the backend (NestJS)
 * should call a Prisma-backed service to resolve the school slug.
 */
export function extractDomainPartsFromHost(
  rawHost: string | undefined | null,
  baseDomain: string = DEFAULT_BASE_DOMAIN,
): DomainParts {
  const host = normalizeHost(rawHost);
  const base = baseDomain.toLowerCase();

  if (!host) {
    return {
      host: '',
      baseDomain: base,
      isCustomDomain: false,
    };
  }

  // If not SaaS domain, treat as custom domain
  if (!isSaasDomain(host, base)) {
    return {
      host,
      baseDomain: base,
      isCustomDomain: true,
    };
  }

  // Host is part of SaaS domain (e.g. murnovakonect.com, portal.murnovakonect.com, goldsworth.murnovakonect.com, admin.goldsworth.murnovakonect.com)
  const hostSegments = host.split('.');
  const baseSegments = base.split('.');

  // Example:
  // hostSegments  = ['portal','goldsworth','murnovakonect','com']
  // baseSegments  = ['murnovakonect','com']
  // prefixSegments = ['portal','goldsworth']
  const prefixSegments = hostSegments.slice(0, hostSegments.length - baseSegments.length);

  // No prefix: "murnovakonect.com"
  if (prefixSegments.length === 0) {
    return {
      host,
      baseDomain: base,
      isCustomDomain: false,
    };
  }

  // Single prefix:
  // - "portal.murnovakonect.com"       -> module = "portal"
  // - "goldsworth.murnovakonect.com"   -> schoolSlug = "goldsworth"
  if (prefixSegments.length === 1) {
    const [first] = prefixSegments;

    if (first === 'portal') {
      return {
        host,
        baseDomain: base,
        module: 'portal',
        isCustomDomain: false,
      };
    }

    // Default: treat as {schoolSlug}.murnovakonect.com
    return {
      host,
      baseDomain: base,
      schoolSlug: first,
      isCustomDomain: false,
    };
  }

  // Two prefixes:
  // - "admin.goldsworth.murnovakonect.com" -> module = "admin", schoolSlug = "goldsworth"
  if (prefixSegments.length === 2) {
    const [maybeModule, maybeSchool] = prefixSegments;

    // If first segment looks like a module, second is school slug
    return {
      host,
      baseDomain: base,
      module: maybeModule,
      schoolSlug: maybeSchool,
      isCustomDomain: false,
    };
  }

  // More than two segments before the base domain is unusual for the SaaS,
  // but we try to interpret last segment as school slug and previous as module.
  const schoolSlug = prefixSegments[prefixSegments.length - 1];
  const module = prefixSegments[prefixSegments.length - 2];

  return {
    host,
    baseDomain: base,
    module,
    schoolSlug,
    isCustomDomain: false,
  };
}

/**
 * Backwards-compatible helper if you just want the school slug.
 * Returns undefined for:
 *  - portal.murnovakonect.com
 *  - pure base: murnovakonect.com
 *  - custom domains (goldsworth.com.ng)
 */
export function extractSchoolSlugFromHost(
  rawHost: string | undefined | null,
  baseDomain: string = DEFAULT_BASE_DOMAIN,
): string | undefined {
  const parts = extractDomainPartsFromHost(rawHost, baseDomain);
  return parts.schoolSlug;
}
