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

export function validateLogin(values: LoginFormValues) {
    const errors: Partial<Record<keyof LoginFormValues, string>> = {}

    if (!values.email) {
        errors.email = "L'email est requis"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "L'email n'est pas valide"
    }

    if (!values.password) {
        errors.password = "Le mot de passe est requis"
    } else if (values.password.length < 8) {
        errors.password = "Le mot de passe doit contenir au moins 8 caractères"
    }

    return errors
}

export function validateRegistration(values: RegisterFormValues) {
    const errors: Partial<Record<keyof RegisterFormValues, string>> = {}

    if (!values.email) {
        errors.email = "L'email est requis"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "L'email n'est pas valide"
    }

    if (!values.password || !values.confirmPassword) {
        errors.password = "Le mot de passe est requis"
    } else if (values.password.length < 8 || values.confirmPassword.length < 8) {
        errors.password = "Le mot de passe doit contenir au moins 8 caractères"
    }

    if (values.password != values.confirmPassword) {
        errors.confirmPassword = "Les mot de passe ne sont pas identiques"
    }
    return errors
}