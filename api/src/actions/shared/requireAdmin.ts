import type { FluxContext } from '../../types';

/**
 * Checks if the authenticated user has admin role.
 * Must be called after validateAuth.
 * Returns { allowed: true } or { allowed: false, error: "..." }
 */
export default async function requireAdmin(ctx: FluxContext) {
  const role = ctx.state.userRole;
  
  if (!role) {
    return {
      allowed: false,
      error: 'Not authenticated'
    };
  }

  if (role !== 'admin') {
    return {
      allowed: false,
      error: 'Admin access required'
    };
  }

  return {
    allowed: true
  };
}
