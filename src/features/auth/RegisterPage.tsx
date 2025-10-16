import AuthPage from './AuthPage'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthPage>
      <div className="mt-7">
        <div className="p-4 sm:p-7">
          <div className="text-left">
            <h1 className="block text-2xl font-bold text-gray-800">Inscription</h1>
            <p className="mt-2 text-sm text-neutral-600">Bienvenue sur Scoretune !</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </AuthPage>
  )
}
