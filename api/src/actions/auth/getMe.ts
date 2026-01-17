import type { FluxContext } from '../../types';

/**
 * Get current user profile.
 * Requires authentication (validateAuth must run before).
 */
export default async function getMe(ctx: FluxContext) {
  const userId = ctx.state.userId;

  if (!userId) {
    return {
      success: false,
      error: 'Not authenticated'
    };
  }

  const result = await ctx.plugins.db.query(
    'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1 AND deleted_at IS NULL',
    [userId]
  );

  if (result.rows.length === 0) {
    return {
      success: false,
      error: 'User not found'
    };
  }

  const user = result.rows[0];

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  };
}
