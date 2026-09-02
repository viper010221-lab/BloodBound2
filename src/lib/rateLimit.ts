// In-memory rate limiter — 15 minutes between submissions per IP
// Resets on server restart (sufficient for anti-troll protection)

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const rateLimitStore = new Map<string, number>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const lastSubmission = rateLimitStore.get(ip);

  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW_MS) {
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - lastSubmission);
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  // Record this submission
  rateLimitStore.set(ip, now);
  return { allowed: true, retryAfterSeconds: 0 };
}

// Clean up old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 minutes
