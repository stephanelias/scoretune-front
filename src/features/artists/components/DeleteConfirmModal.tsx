interface DeleteConfirmModalProps {
  modalId: string
  artistName: string
  onConfirm: () => void
  isDeleting: boolean
}

export default function DeleteConfirmModal({
  modalId,
  artistName,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  return (
    <div
      id={modalId}
      className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabIndex={-1}
      aria-labelledby={`${modalId}-label`}
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
            <h3 id={`${modalId}-label`} className="font-bold text-gray-800">
              Confirmer la suppression
            </h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Close"
              data-hs-overlay={`#${modalId}`}
            >
              <span className="sr-only">Close</span>
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
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <p className="text-gray-800">
              Êtes-vous sûr de vouloir supprimer l'artiste{' '}
              <span className="font-semibold">{artistName}</span> ?
            </p>
            <p className="text-sm text-gray-600 mt-2">Cette action est irréversible.</p>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-overlay={`#${modalId}`}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
              disabled={isDeleting}
            >
              {isDeleting && (
                <span
                  className="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                ></span>
              )}
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
