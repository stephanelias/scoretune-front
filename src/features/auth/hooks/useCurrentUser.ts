import { useQuery } from '@tanstack/react-query'

import type { User } from '../models/User'
import { getCurrentUser } from '../services/AuthService'

export function useCurrentUser(enabled: boolean = false) {
  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    enabled,
  })
}
