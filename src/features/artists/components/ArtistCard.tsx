import { useNavigate } from 'react-router-dom'
import { ArtistTypeBadgeColors, ArtistTypeLabels } from '../models/ArtistType'
import type { ArtistDto } from '../models/ArtistDto'

interface ArtistCardProps {
  artist: ArtistDto
  onEdit: (artist: ArtistDto) => void
  onDelete: (artist: ArtistDto) => void
  canEdit: boolean
}

export default function ArtistCard({ artist, onEdit, onDelete, canEdit }: ArtistCardProps) {
  const navigate = useNavigate()

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    navigate(`/artists/${artist.id}`)
  }

  return (
    <div 
      className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-3">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          {artist.photoLink ? (
            <img
              className="size-20 rounded-full object-cover mb-3"
              src={artist.photoLink}
              alt={artist.name}
            />
          ) : (
            <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg
                className="size-10 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}

          {/* Nom */}
          <h3 className="font-semibold text-gray-800 mb-2">{artist.name}</h3>

          {/* Badge Type */}
          <span
            className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium mb-3 ${ArtistTypeBadgeColors[artist.type]}`}
          >
            {ArtistTypeLabels[artist.type]}
          </span>

          {/* Actions */}
          {canEdit && (
            <div className="flex gap-x-2 w-full mt-2">
              <button
                type="button"
                onClick={() => onEdit(artist)}
                className="flex-1 py-2 px-3 inline-flex justify-center items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-700 hover:underline focus:outline-hidden focus:underline disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#artist-form-modal"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Modifier
              </button>
              <button
                type="button"
                onClick={() => onDelete(artist)}
                className="py-2 px-3 inline-flex justify-center items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-700 hover:underline focus:outline-hidden focus:underline disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#delete-confirm-modal"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
