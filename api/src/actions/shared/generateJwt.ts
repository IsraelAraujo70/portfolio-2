import type { FluxContext } from '../../types';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Generates a JWT token for a user.
 * Expects ctx.args: { userId, email, role }
 * Returns { token: "..." }
 */
export default async function generateJwt(ctx: FluxContext) {
  const { userId, email, role } = ctx.args as TokenPayload;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not configured');
  }

  const token = jwt.sign(
    {
      userId,
      email,
      role
    },
    secret,
    {
      expiresIn: '24h',
      subject: String(userId)
    }
  );

  return { token };
}
