import type { FluxContext } from '../../types';

/**
 * Soft delete user by ID (admin only).
 * Sets deleted_at timestamp instead of actually deleting.
 */
export default async function deleteUser(ctx: FluxContext) {
  const { id } = ctx.input;

  if (!id) {
    return {
      success: false,
      error: 'User ID is required'
    };
  }

  // Check if user exists
  const existingUser = await ctx.plugins.db.query(
    'SELECT id FROM users WHERE id = $1 AND deleted_at IS NULL',
    [id]
  );

  if (existingUser.rows.length === 0) {
    return {
      success: false,
      error: 'User not found'
    };
  }

  // Soft delete
  await ctx.plugins.db.query(
    'UPDATE users SET deleted_at = NOW(), updated_at = NOW() WHERE id = $1',
    [id]
  );

  return {
    success: true,
    message: 'User deleted successfully'
  };
}
