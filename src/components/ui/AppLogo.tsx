import { Link } from 'react-router-dom'

export default function AppLogo() {
  return (
    <header className="py-2.5 px-4 flex justify-between items-center gap-x-2">
      <div className="-ms-2 flex items-center gap-x-1">
        <div className="md:hs-overlay-minified:hidden">
          <Link
            className="items-center rounded-lg text-xl font-semibold hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
            to="/"
            aria-label="Preline"
          >
            Scoretune
          </Link>
        </div>

        <button
          type="button"
          className="hidden md:hs-overlay-minified:flex justify-center items-center flex-none gap-x-3 size-9 text-sm text-gray-500 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
          aria-haspopup="dialog"
          aria-expanded="true"
          aria-controls="hs-pro-sidebar"
          aria-label="Minify navigation"
          data-hs-overlay-minifier="#hs-pro-sidebar"
        >
          <svg
            className="hidden hs-overlay-minified:block shrink-0 size-4"
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
          <svg
            className="hs-overlay-minified:hidden shrink-0 size-4"
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
            <path d="m10 15-3-3 3-3"></path>
          </svg>
          <span className="sr-only">Sidebar Toggle</span>
        </button>

        <div className="hidden sm:block md:hs-overlay-minified:hidden"></div>
      </div>

      <button
        type="button"
        className="hidden md:hs-overlay-minified:hidden md:flex justify-center items-center flex-none gap-x-3 size-9 text-sm text-gray-500 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
        aria-haspopup="dialog"
        aria-expanded="true"
        aria-controls="hs-pro-sidebar"
        aria-label="Minify navigation"
        data-hs-overlay-minifier="#hs-pro-sidebar"
      >
        <svg
          className="hidden hs-overlay-minified:block shrink-0 size-4"
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
        <svg
          className="hs-overlay-minified:hidden shrink-0 size-4"
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
          <path d="m10 15-3-3 3-3"></path>
        </svg>
        <span className="sr-only">Sidebar Toggle</span>
      </button>
      {/* End Sidebar Toggle */}

      {/* Sidebar Toggle */}
      <button
        type="button"
        className="flex md:hidden justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
        data-hs-overlay="#hs-pro-sidebar"
        aria-expanded="true"
      >
        <svg
          className="shrink-0 size-3.5"
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
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span className="sr-only">Close</span>
      </button>
      {/* End Sidebar Toggle */}
    </header>
  )
}
