import Illustration from '../../assets/undraw_mello_uiud.svg'
import type { ReactNode } from 'react'

interface AuthPageProps {
  children: ReactNode
}
export default function AuthPage({ children }: AuthPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl w-full">
        <div className="p-8">{children}</div>
        <div className="flex items-center justify-center p-4">
          <img src={Illustration} alt="Illustration" className="w-full h-full object-none" />
        </div>
      </div>
    </div>
  )
}
