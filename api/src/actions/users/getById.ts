import type { FluxContext } from '../../types';

/**
 * Get user by ID (admin only).
 */
export default async function getById(ctx: FluxContext) {
  const { id } = ctx.input;

  if (!id) {
    return {
      success: false,
      error: 'User ID is required'
    };
  }

  const result = await ctx.plugins.db.query(
    `SELECT id, name, email, role, created_at, updated_at 
     FROM users 
     WHERE id = $1 AND deleted_at IS NULL`,
    [id]
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
