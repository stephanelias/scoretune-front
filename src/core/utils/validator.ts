export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues {
  email: string
  fullName: string
  password: string
  confirmPassword: string
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const MIN_PASSWORD_LENGTH = 8

const validateEmail = (email: string): string | null => {
  if (!email) {
    return "L'email est requis"
  }
  if (!EMAIL_REGEX.test(email)) {
    return "L'email n'est pas valide"
  }
  return null
}

const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Le mot de passe est requis'
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères`
  }
  return null
}

const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) {
    return 'Les mots de passe ne sont pas identiques'
  }
  return null
}

export function validateLogin(values: LoginFormValues) {
  const errors: Partial<Record<keyof LoginFormValues, string>> = {}

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = passwordError

  return errors
}

export function validateRegistration(values: RegisterFormValues) {
  const errors: Partial<Record<keyof RegisterFormValues, string>> = {}

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = passwordError

  const confirmPasswordError = validatePassword(values.confirmPassword)
  if (confirmPasswordError && !passwordError) {
    errors.confirmPassword = confirmPasswordError
  }

  const passwordMatchError = validatePasswordMatch(values.password, values.confirmPassword)
  if (passwordMatchError && !passwordError && !confirmPasswordError) {
    errors.confirmPassword = passwordMatchError
  }

  return errors
}
