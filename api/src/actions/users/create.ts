import { validateOrThrow } from 'flux-oriented-architecture';
import type { FluxContext } from '../../types';
import bcrypt from 'bcryptjs';

/**
 * Create a new user (admin only).
 * Password defaults to a hash of "changeme123".
 */
export default async function create(ctx: FluxContext) {
  // Validate input
  validateOrThrow(ctx.input, {
    name: { required: true, minLength: 2, maxLength: 255 },
    email: { required: true, type: 'email' }
  });

  const { name, email, role = 'user' } = ctx.input;

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

  // Default password
  const defaultPassword = 'changeme123';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

  // Validate role
  const validRoles = ['user', 'admin'];
  const userRole = validRoles.includes(role) ? role : 'user';

  // Insert user
  const result = await ctx.plugins.db.query(
    `INSERT INTO users (name, email, password, role, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, NOW(), NOW()) 
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, userRole]
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
