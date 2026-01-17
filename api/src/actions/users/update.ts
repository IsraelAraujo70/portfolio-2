import { validateOrThrow } from 'flux-oriented-architecture';
import type { FluxContext } from '../../types';

/**
 * Update user by ID (admin only).
 * Only name and email can be updated.
 */
export default async function update(ctx: FluxContext) {
  const { id, name, email } = ctx.input;

  if (!id) {
    return {
      success: false,
      error: 'User ID is required'
    };
  }

  // Validate input
  validateOrThrow(ctx.input, {
    name: { minLength: 2, maxLength: 255 },
    email: { type: 'email' }
  });

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

  // If email is being changed, check for duplicates
  if (email) {
    const emailCheck = await ctx.plugins.db.query(
      'SELECT id FROM users WHERE email = $1 AND id != $2 AND deleted_at IS NULL',
      [email, id]
    );

    if (emailCheck.rows.length > 0) {
      return {
        success: false,
        error: 'Email already in use'
      };
    }
  }

  // Build update query dynamically
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (name) {
    updates.push(`name = $${paramIndex++}`);
    values.push(name);
  }

  if (email) {
    updates.push(`email = $${paramIndex++}`);
    values.push(email);
  }

  if (updates.length === 0) {
    return {
      success: false,
      error: 'No fields to update'
    };
  }

  updates.push(`updated_at = NOW()`);
  values.push(id);

  const result = await ctx.plugins.db.query(
    `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} AND deleted_at IS NULL
     RETURNING id, name, email, role, created_at, updated_at`,
    values
  );

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
