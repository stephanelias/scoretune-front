import {Link, useNavigate} from 'react-router-dom'
import {ChangeEvent, FormEvent, useState} from "react";
import {RegisterFormValues, validateRegistration} from "../../../core/utils/validator";
import {useAuth} from "../../../core/contexts/AuthContext";

export default function RegisterForm() {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validateRegistration(formValues)
    console.log("VALIDATION ERRORS =", validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await register(formValues)
    } catch (err) {
      console.error(err)
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
            <label htmlFor="username" className="block text-sm mb-2">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
                value={formValues.fullName}
                onChange={handleChange}
                aria-describedby="username-error"
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
              Please include a valid username so we can get back to you
            </p>
          </div>

          <div>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <label htmlFor="password" className="block text-sm mb-2">
                Mot de passe
              </label>
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

          <div>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <label htmlFor="password" className="block text-sm mb-2">
                Corfirmation du mot de passe
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
                value={formValues.confirmPassword}
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
            aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-custom-backdrop-modal"
            data-hs-overlay="#hs-custom-backdrop-modal"
          >
            <span
              className="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"
            ></span>
            Inscription
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Vous avez déjà un compte ?
            <Link
              to="/auth/login"
              className="text-blue-600 ms-1 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
            >
              Connectez vous !
            </Link>
          </p>
        </div>
      </form>


      <div id="hs-custom-backdrop-modal"
           className="hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
           role="dialog" tabIndex="-1" aria-labelledby="hs-custom-backdrop-label">
        <div
            className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div
              className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div
                className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">

              <button type="button"
                      className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                      aria-label="Close" data-hs-overlay="#hs-custom-backdrop-modal">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <div
                  className="mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
                  role="alert" tabIndex="-1" aria-labelledby="hs-soft-color-success-label">
                <span id="hs-soft-color-success-label" className="font-bold">Ok !</span>
              </div>
            </div>
            <div
                className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
              <button type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-custom-backdrop-modal">
                Close
              </button>
              <button type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 focus:outline-hidden focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={()=> navigate("/auth/login")}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
