import type { ReactNode } from 'react'

type ModalMaxWidth = 'lg' | 'xl' | '2xl' | '3xl'

const maxWidthClasses: Record<ModalMaxWidth, string> = {
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
}

interface ModalProps {
  modalId: string
  title: string
  children: ReactNode
  footer?: ReactNode
  maxWidth?: ModalMaxWidth
}

export default function Modal({ modalId, title, children, footer, maxWidth = 'lg' }: ModalProps) {
  return (
    <div
      id={modalId}
      className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabIndex={-1}
      aria-labelledby={`${modalId}-label`}
    >
      <div
        className={`hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all ${maxWidthClasses[maxWidth]} sm:w-full m-3 sm:mx-auto`}
      >
        <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
            <h3 id={`${modalId}-label`} className="font-bold text-gray-800">
              {title}
            </h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Fermer"
              data-hs-overlay={`#${modalId}`}
            >
              <span className="sr-only">Fermer</span>
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
          <div className="p-4 overflow-y-auto">{children}</div>
          {footer && (
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
