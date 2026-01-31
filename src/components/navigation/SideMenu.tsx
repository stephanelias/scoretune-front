export default function SideMenu() {
  return (
    <>
      <div className="mb-5 px-2 flex flex-col gap-y-5">
        <ul className="flex flex-col gap-y-0.5">
          <li>
            <a
              className="group relative w-full flex items-center gap-1 py-1.5 px-2.5 relative text-sm text-gray-800 rounded-lg before:absolute before:inset-y-0 before:-start-2 before:rounded-e-full before:w-1 before:h-full hover:bg-gray-100/70 focus:outline-hidden focus:bg-gray-100/70 "
              href="index.html"
            >
              <span className="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 size-4 group-hover:scale-115 group-focus:scale-115 transition-transform duration-300"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              <span className="truncate hs-overlay-minified:opacity-0 transition-opacity duration-300">
                Accueil
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className="hs-overlay-minified:opacity-0 transition-opacity duration-300 pb-4 px-2 size-full flex flex-col gap-y-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <div className="flex flex-col">
          <span className="block ps-2.5 mb-2 text-sm text-gray-400">ADMIN</span>
        </div>
      </div>
    </>
  )
}
