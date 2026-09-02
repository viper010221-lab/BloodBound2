// Security helpers for API routes
// All sensitive operations happen server-side only

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL || "https://bloodbound SMP.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

// Get client IP from request headers (server-side only)
export function getClientIP(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // Take the first IP in the chain (original client)
    return xForwardedFor.split(",")[0].trim();
  }

  const xRealIP = request.headers.get("x-real-ip");
  if (xRealIP) return xRealIP.trim();

  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP.trim();

  // Fallback — no IP found
  return "unknown";
}

// Validate request origin
export function isValidOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Allow same-origin requests (no header on same domain)
  if (!origin && !referer) return true;

  const checkUrl = origin || referer || "";
  return ALLOWED_ORIGINS.some((allowed) => checkUrl.startsWith(allowed));
}

// Sanitize string input — strip HTML and limit length
export function sanitizeInput(value: unknown): string {
  if (typeof value !== "string") return "";

  return value
    .replace(/[<>]/g, "") // Strip < and > to prevent HTML injection
    .replace(/javascript:/gi, "") // Strip javascript: protocol
    .replace(/on\w+=/gi, "") // Strip event handlers
    .trim()
    .slice(0, 2000); // Cap length
}

// Sanitize all fields in an object
export function sanitizeFormData(data: Record<string, unknown>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "boolean") {
      sanitized[key] = value ? "Yes" : "No";
    } else if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = String(value).slice(0, 2000);
    }
  }
  return sanitized;
}

// Security headers for all API responses
export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "Pragma": "no-cache",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};
