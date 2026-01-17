import type { FluxContext } from '../../types';
import bcrypt from 'bcryptjs';

/**
 * Compares a plain password with a hash.
 * Expects ctx.args: { password, hash }
 * Returns { valid: boolean }
 */
export default async function checkPassword(ctx: FluxContext) {
  const { password, hash } = ctx.args as { password: string; hash: string };

  if (!password || !hash) {
    return { valid: false };
  }

  const valid = await bcrypt.compare(password, hash);
  return { valid };
}
