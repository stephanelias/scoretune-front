import { api } from '../../../lib/axios'
import type { LoginRequestDto } from '../models/LoginRequestDto'
import type { User } from '../models/User'
import {RegisterRequestDto} from "../models/RegisterRequestDto";

export async function login(data: LoginRequestDto) {
  const res = await api.post('/auth/login', data)
  return res.data
}

export async function register(data: RegisterRequestDto) {
  const res = await api.post('/auth/register', data)
  return res.data
}

export async function getCurrentUser() {
  const res = await api.get<User>('/users/me')
  return res.data
}
