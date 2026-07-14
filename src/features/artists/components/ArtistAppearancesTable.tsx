import { Link } from 'react-router-dom'

import Pagination from '../../../components/ui/Pagination'
import type { ArtistSummaryDto } from '../../projects/models/ArtistSummaryDto'
import type { ProjectAppearanceDto } from '../models/ProjectAppearanceDto'

interface ArtistAppearancesTableProps {
  appearances: ProjectAppearanceDto[]
  isLoading: boolean
  page: number
  pageSize: number
  totalPages: number
  onPageChange: (page: number) => void
}

function ArtistNames({ artists }: { artists: ArtistSummaryDto[] }) {
  if (artists.length === 0) {
    return <>Artiste inconnu</>
  }

  return (
    <>
      {artists.map((artist, index) => (
        <span key={artist.id}>
          {index > 0 && ', '}
          <Link to={`/artists/${artist.id}`} className="hover:text-gray-800 hover:underline">
            {artist.name}
          </Link>
        </span>
      ))}
    </>
  )
}

function AppearanceArtists({ appearance }: { appearance: ProjectAppearanceDto }) {
  const artists = [...appearance.interpreters, ...appearance.featurings]

  return <ArtistNames artists={artists} />
}

export default function ArtistAppearancesTable({
  appearances,
  isLoading,
  page,
  pageSize,
  totalPages,
  onPageChange,
}: ArtistAppearancesTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span
          className="animate-spin inline-block size-8 border-4 border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        />
      </div>
    )
  }

  if (appearances.length === 0) {
    return (
      <div className="max-w-sm mx-auto text-center py-16">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune apparition</h3>
        <p className="text-gray-600">
          Les titres où cet artiste est en featuring apparaîtront ici.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto min-w-0">
      <div className="border border-gray-200 rounded-lg overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-16 px-4 py-2.5 text-start text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th scope="col" className="px-4 py-2.5 text-start text-xs font-medium text-gray-500 uppercase">
                Titre
              </th>
              <th scope="col" className="px-4 py-2.5 text-start text-xs font-medium text-gray-500 uppercase">
                Projet
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appearances.map((appearance, index) => (
              <tr key={appearance.trackId}>
                <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-500 tabular-nums">
                  {(page - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-2.5 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <Link to={`/projects/${appearance.projectId}`} className="shrink-0">
                      {appearance.projectCoverLink ? (
                        <img
                          src={appearance.projectCoverLink}
                          alt={appearance.projectName}
                          className="size-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <svg
                            className="size-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                            />
                          </svg>
                        </div>
                      )}
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to={`/projects/${appearance.projectId}`}
                        className="block text-sm font-medium text-gray-800 truncate hover:underline"
                      >
                        {appearance.trackName}
                      </Link>
                      <p className="mt-0.5 text-sm text-gray-500 truncate">
                        <AppearanceArtists appearance={appearance} />
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-800">
                  <Link to={`/projects/${appearance.projectId}`} className="hover:underline">
                    {appearance.projectName}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="py-2 px-4 border-t border-gray-200">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
