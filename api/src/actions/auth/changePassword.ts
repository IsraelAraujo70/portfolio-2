import { validateOrThrow } from 'flux-oriented-architecture';
import type { FluxContext } from '../../types';
import bcrypt from 'bcryptjs';

/**
 * Change password for the authenticated user.
 * Requires authentication (validateAuth must run before).
 */
export default async function changePassword(ctx: FluxContext) {
  const userId = ctx.state.userId;

  if (!userId) {
    return {
      success: false,
      error: 'Not authenticated'
    };
  }

  // Validate input
  validateOrThrow(ctx.input, {
    currentPassword: { required: true, minLength: 1 },
    newPassword: { required: true, minLength: 6 }
  });

  const { currentPassword, newPassword } = ctx.input;

  // Get current user password
  const userResult = await ctx.plugins.db.query(
    'SELECT password FROM users WHERE id = $1 AND deleted_at IS NULL',
    [userId]
  );

  if (userResult.rows.length === 0) {
    return {
      success: false,
      error: 'User not found'
    };
  }

  // Verify current password
  const validPassword = await bcrypt.compare(currentPassword, userResult.rows[0].password);
  if (!validPassword) {
    return {
      success: false,
      error: 'Current password is incorrect'
    };
  }

  // Hash new password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  await ctx.plugins.db.query(
    'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
    [hashedPassword, userId]
  );

  return {
    success: true,
    message: 'Password changed successfully'
  };
}
