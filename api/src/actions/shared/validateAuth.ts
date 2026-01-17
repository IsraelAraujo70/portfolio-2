import type { FluxContext } from '../../types';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Validates the Bearer token from Authorization header.
 * If valid, adds user info to ctx.state.
 * Returns { valid: true, user: {...} } or { valid: false, error: "..." }
 */
export default async function validateAuth(ctx: FluxContext) {
  const authHeader = ctx.req.headers?.authorization || ctx.req.get?.('Authorization') || '';
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      valid: false,
      error: 'Authorization header required'
    };
  }

  const token = authHeader.substring(7); // Remove "Bearer "

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return {
        valid: false,
        error: 'JWT secret not configured'
      };
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    // Add user info to state for downstream actions
    ctx.state.userId = decoded.userId;
    ctx.state.userEmail = decoded.email;
    ctx.state.userRole = decoded.role;

    return {
      valid: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      }
    };
  } catch (err) {
    const error = err as Error;
    if (error.name === 'TokenExpiredError') {
      return {
        valid: false,
        error: 'Token expired'
      };
    }
    return {
      valid: false,
      error: 'Invalid token'
    };
  }
}
