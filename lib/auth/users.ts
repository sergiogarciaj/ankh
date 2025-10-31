/**
 * Sistema de gestión de usuarios local
 * NOTA: Esto usa almacenamiento en memoria. Para producción, migrar a base de datos real.
 */

import crypto from 'crypto'

export interface User {
  id: string
  email: string
  name: string
  password: string // hash
  image?: string
  createdAt: Date
}

// Store en memoria (temporal - migrar a DB en producción)
const users: Map<string, User> = new Map()

// Usuario de prueba inicial
const testUser: User = {
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Usuario de Prueba',
  password: hashPassword('password123'), // contraseña: password123
  createdAt: new Date(),
}
users.set(testUser.email, testUser)

/**
 * Hash de contraseña usando crypto (Node.js built-in)
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

/**
 * Verificar contraseña
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const [salt, hash] = hashedPassword.split(':')
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === verifyHash
}

/**
 * Obtener usuario por email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return users.get(email.toLowerCase()) || null
}

/**
 * Crear nuevo usuario
 */
export async function createUser(data: {
  email: string
  name: string
  password: string
}): Promise<User> {
  const email = data.email.toLowerCase()

  // Verificar si el usuario ya existe
  if (users.has(email)) {
    throw new Error('El email ya está registrado')
  }

  // Crear usuario
  const user: User = {
    id: crypto.randomUUID(),
    email,
    name: data.name,
    password: hashPassword(data.password),
    createdAt: new Date(),
  }

  // Guardar en el store
  users.set(email, user)

  return user
}

/**
 * Obtener todos los usuarios (solo para debug)
 */
export async function getAllUsers(): Promise<User[]> {
  return Array.from(users.values()).map((user) => ({
    ...user,
    password: '[REDACTED]',
  })) as User[]
}
