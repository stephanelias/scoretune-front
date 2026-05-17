interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  className?: string
  disabled?: boolean
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Rechercher…',
  id = 'search-input',
  className = '',
  disabled = false,
}: SearchInputProps) {
  return (
    <div className={`max-w-sm w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
          <svg
            className="shrink-0 size-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          id={id}
          type="search"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className="py-2.5 sm:py-3 ps-11 pe-4 rounded-full block w-full bg-white border border-gray-200 sm:text-sm text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder={placeholder}
          aria-label={placeholder}
        />
      </div>
    </div>
  )
}
