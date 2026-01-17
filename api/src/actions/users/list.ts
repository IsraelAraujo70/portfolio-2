import type { FluxContext } from '../../types';

/**
 * List all users (admin only).
 * Excludes soft-deleted users.
 */
export default async function list(ctx: FluxContext) {
  const result = await ctx.plugins.db.query(
    `SELECT id, name, email, role, created_at, updated_at 
     FROM users 
     WHERE deleted_at IS NULL 
     ORDER BY created_at DESC`
  );

  return {
    success: true,
    users: result.rows.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    }))
  };
}
