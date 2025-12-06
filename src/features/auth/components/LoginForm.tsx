import { Link } from 'react-router-dom'
import {useAuth} from "../../../core/contexts/AuthContext";
import {ChangeEvent, FormEvent, useState} from "react";
import {LoginFormValues, validateLogin} from "../../../core/utils/validator";

export default function LoginForm() {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validateLogin(formValues)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      console.log(formValues)
      login(formValues)
    } catch (err) {
      console.error(err)
      setErrors({ password: "Email ou mot de passe incorrect" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Adresse email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
                value={formValues.email}
                onChange={handleChange}
                aria-describedby="email-error"
              />
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg
                  className="size-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="email-error">
              Please include a valid email address so we can get back to you
            </p>
          </div>

          <div>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <label htmlFor="password" className="block text-sm mb-2">
                Mot de passe
              </label>
              <a
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                href="../examples/html/recover-account.html"
              >
                Mot de passe oublié ?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
                value={formValues.password}
                onChange={handleChange}
                aria-describedby="password-error"
              />
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg
                  className="size-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="password-error">
              8+ characters required
            </p>
          </div>

          <div className="flex items-center">
            <div className="flex">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ms-3">
              <label htmlFor="remember-me" className="text-sm">
                Se souvenir de moi
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span
              className="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"
            ></span>
            Connexion
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Vous n'avez pas encore de compte ?
            <Link
              to="/auth/register"
              className="text-blue-600 ms-1 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
            >
              Inscrivez vous !
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
