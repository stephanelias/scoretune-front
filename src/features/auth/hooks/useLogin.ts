import { useMutation } from '@tanstack/react-query'

import type { LoginRequestDto } from '../models/LoginRequestDto'
import type { LoginResponseDto } from '../models/LoginResponseDto'
import { login } from '../services/AuthService'

export function useLogin() {
  return useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationFn: login,
  })
}
