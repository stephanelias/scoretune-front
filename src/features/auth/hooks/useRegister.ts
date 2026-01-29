import { useMutation } from '@tanstack/react-query'

import type { RegisterRequestDto } from '../models/RegisterRequestDto'
import type { User } from '../models/User'
import { register } from '../services/AuthService'

export function useRegister() {
  return useMutation<User, Error, RegisterRequestDto>({
    mutationFn: register,
  })
}
