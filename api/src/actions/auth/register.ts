import { validateOrThrow } from 'flux-oriented-architecture';
import type { FluxContext } from '../../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * User registration action.
 * Creates a new user and returns user + JWT token.
 * Admin role can be granted with ADMIN_REGISTRATION_CODE.
 */
export default async function register(ctx: FluxContext) {
  // Validate input
  validateOrThrow(ctx.input, {
    name: { required: true, minLength: 2, maxLength: 255 },
    email: { required: true, type: 'email' },
    password: { required: true, minLength: 6 }
  });

  const { name, email, password, adminCode } = ctx.input;

  // Check if email already exists
  const existingUser = await ctx.plugins.db.query(
    'SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL',
    [email]
  );

  if (existingUser.rows.length > 0) {
    return {
      success: false,
      error: 'Email already registered'
    };
  }

  // Determine role
  let role = 'user';
  const adminRegistrationCode = process.env.ADMIN_REGISTRATION_CODE;
  if (adminCode && adminRegistrationCode && adminCode === adminRegistrationCode) {
    role = 'admin';
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert user
  const result = await ctx.plugins.db.query(
    `INSERT INTO users (name, email, password, role, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, NOW(), NOW()) 
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, role]
  );

  const user = result.rows[0];

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
