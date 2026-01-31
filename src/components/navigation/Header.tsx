import UserInfos from '../ui/UserInfos'

interface HeaderProps {
  title: string
}
export default function Header({ title }: HeaderProps) {
  return (
    <header className="md:ms-65 xl:hs-overlay-layout-open:me-96 md:hs-overlay-minified:ms-13 transition-all duration-300 fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 md:z-61 bg-white py-2.5">
      <nav className="px-4 sm:px-5.5 flex basis-full justify-between items-center w-full mx-auto">
        <div className="flex items-center sm:gap-x-1.5 truncate">
          <button
            type="button"
            className="md:hidden flex justify-center items-center flex-none gap-x-3 size-9 text-sm text-gray-500 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
            aria-haspopup="dialog"
            aria-expanded="true"
            aria-controls="hs-pro-sidebar"
            aria-label="Minify navigation"
            data-hs-overlay="#hs-pro-sidebar"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M15 3v18"></path>
              <path d="m8 9 3 3-3 3"></path>
            </svg>
            <span className="sr-only">Sidebar Toggle</span>
          </button>

          <span className="truncate font-medium text-sm sm:text-base text-gray-800">{title}</span>
        </div>

        <UserInfos />
      </nav>
    </header>
  )
}
