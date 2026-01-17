import type { FluxContext } from '../../types';
import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt.
 * Expects ctx.args: { password }
 * Returns { hash: "..." }
 */
export default async function hashPassword(ctx: FluxContext) {
  const { password } = ctx.args as { password: string };

  if (!password) {
    throw new Error('Password is required');
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  return { hash };
}
