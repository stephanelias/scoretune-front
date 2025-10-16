import AuthPage from './AuthPage'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <AuthPage>
      <div className="mt-7">
        <div className="p-4 sm:p-7">
          <div className="text-left">
            <h1 className="block text-2xl font-bold text-gray-800">Connexion</h1>
            <p className="mt-2 text-sm text-neutral-600">Content de te revoir sur Scoretune !</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </AuthPage>
  )
}
