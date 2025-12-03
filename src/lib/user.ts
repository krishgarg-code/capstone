import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { database } from './db';
import { QueryResult } from '@neondatabase/serverless';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  profile_image?: string;
  age?: number;
  city?: string;
  state?: string;
}

// Create users table if it doesn't exist
export async function initializeDatabase() {
  await database.createUsersTable();
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret_key', {
    expiresIn: '7d',
  });
}

// Verify JWT token
export function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key') as { userId: number };
  } catch (error) {
    return null;
  }
}

// Create a new user
export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    const hashedPassword = await hashPassword(password);
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, hashedPassword];
    const result: any = await database.query(query, values);

    if (result.rows && result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw new Error(`Failed to create user: ${error.message || error}`);
  }
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result: any = await database.query(query, values);
    return (result.rows && result.rows.length > 0) ? result.rows[0] : null;
  } catch (error: any) {
    console.error('Error finding user by email:', error);
    throw new Error(`Failed to find user by email: ${error.message || error}`);
  }
}

// Find user by ID
export async function findUserById(id: number): Promise<User | null> {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result: any = await database.query(query, values);
    return (result.rows && result.rows.length > 0) ? result.rows[0] : null;
  } catch (error: any) {
    console.error('Error finding user by ID:', error);
    throw new Error(`Failed to find user by ID: ${error.message || error}`);
  }
}