import type { ReactNode } from 'react'

import Header from '../navigation/Header'
import SideMenu from '../navigation/SideMenu'

import AppLogo from './AppLogo'

interface AppLayoutProps {
  title: string
  children: ReactNode
}
export default function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <>
      <div
        id="hs-pro-sidebar"
        className="hs-overlay [--auto-close:md]
hs-overlay-open:translate-x-0
-translate-x-full transition-all duration-300 transform
w-65 hs-overlay-minified:w-13 overflow-hidden
hidden
fixed inset-y-0 z-60 start-0
bg-white border-e border-gray-200
md:block md:translate-x-0 md:end-auto md:bottom-0"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <AppLogo />

          <SideMenu />
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <main className="md:ps-65 md:hs-overlay-minified:ps-13 transition-all duration-300 pb-4 h-screen flex flex-col bg-white">
        <Header title={title} />

        <div className="h-full flex flex-col justify-between max-w-3xl w-full mt-16 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  )
}
