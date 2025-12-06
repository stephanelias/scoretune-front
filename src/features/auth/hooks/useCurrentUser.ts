import { useQuery } from '@tanstack/react-query'

import type { User } from '../models/User'
import { getCurrentUser } from '../services/AuthService'

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  })
}
