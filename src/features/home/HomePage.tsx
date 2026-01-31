import AppLayout from '../../components/ui/AppLayout'

export default function HomePage() {
  return (
    <AppLayout title="Accueil">
      <div>
        <div
          className="bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg p-4"
          role="alert"
        >
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="size-4 mt-0.5"
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
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div className="ms-3">
              <span className="font-semibold">Catalogue en cours</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
