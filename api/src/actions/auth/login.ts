import { validateOrThrow } from 'flux-oriented-architecture';
import type { FluxContext } from '../../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * User login action.
 * Validates credentials and returns user + JWT token.
 */
export default async function login(ctx: FluxContext) {
  // Validate input
  validateOrThrow(ctx.input, {
    email: { required: true, type: 'email' },
    password: { required: true, minLength: 1 }
  });

  const { email, password } = ctx.input;

  // Find user by email (excluding soft-deleted)
  const result = await ctx.plugins.db.query(
    'SELECT id, name, email, password, role, created_at, updated_at FROM users WHERE email = $1 AND deleted_at IS NULL',
    [email]
  );

  if (result.rows.length === 0) {
    return {
      success: false,
      error: 'Invalid credentials'
    };
  }

  const user = result.rows[0];

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return {
      success: false,
      error: 'Invalid credentials'
    };
  }

  // Generate JWT token
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not configured');
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    secret,
    {
      expiresIn: '24h',
      subject: String(user.id)
    }
  );

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    },
    token
  };
}
