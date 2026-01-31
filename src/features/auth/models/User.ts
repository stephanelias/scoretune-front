export type Role = 'ROLE_ADMIN' | 'ROLE_MODO' | 'ROLE_USER'

export interface User {
  id: string
  fullName: string
  email: string
  roles: Role[]
  createdAt: string
}
