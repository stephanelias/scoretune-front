import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AppLayout from '../../components/ui/AppLayout'
import { createHeroGradient, getAverageColor } from '../../core/utils/imageColor'

import { useProject } from './hooks/useProject'
import type { ArtistSummaryDto } from './models/ArtistSummaryDto'
import { ProjectCategoryLabels } from './models/ProjectCategory'
import { ProjectTypeBadgeColors, ProjectTypeLabels } from './models/ProjectType'
import { ProjectZoneLabels } from './models/ProjectZone'
import type { TrackDto } from './models/TrackDto'

function formatReleaseDate(releaseDate: string) {
  return new Date(`${releaseDate}T00:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function ArtistLinks({
  artists,
  className = 'hover:text-gray-800 hover:underline focus:outline-hidden focus:underline',
}: {
  artists: ArtistSummaryDto[]
  className?: string
}) {
  if (artists.length === 0) {
    return <>—</>
  }

  return (
    <>
      {artists.map((artist, index) => (
        <span key={artist.id}>
          {index > 0 && ', '}
          <Link
            to={`/artists/${artist.id}`}
            className={className}
          >
            {artist.name}
          </Link>
        </span>
      ))}
    </>
  )
}

function TrackRow({ track }: { track: TrackDto }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 tabular-nums">
        {track.trackNumber}
      </td>
      <td className="px-6 py-4 min-w-0">
        <p className="text-sm font-medium text-gray-800">{track.name}</p>
        <p className="mt-1 text-sm text-gray-500">
          <ArtistLinks artists={track.interpreters} />
          {track.featurings.length > 0 && (
            <>
              {' '}feat. <ArtistLinks artists={track.featurings} />
            </>
          )}
        </p>
      </td>
    </tr>
  )
}

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: project, isLoading, isError } = useProject(id!)
  const [heroGradient, setHeroGradient] = useState(
    'linear-gradient(to bottom, rgb(83, 83, 83) 0%, rgba(18, 18, 18, 1) 100%)',
  )

  useEffect(() => {
    if (project?.coverLink) {
      getAverageColor(project.coverLink).then(color => {
        setHeroGradient(createHeroGradient(color))
      })
    }
  }, [project?.coverLink])

  if (isLoading) {
    return (
      <AppLayout title="Projet" maxWidth="full" hideHeader={true}>
        <div className="flex items-center justify-center h-full">
          <div
            className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-gray-800 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (isError || !project) {
    return (
      <AppLayout title="Projet" maxWidth="full" hideHeader={true}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="max-w-sm mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Projet introuvable</h2>
            <p className="text-gray-600 mb-6">
              Le projet que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900"
            >
              Retour aux projets
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  const sortedTracks = [...project.tracks].sort((a, b) => a.trackNumber - b.trackNumber)
  const tracksCountLabel = `${sortedTracks.length} titre${sortedTracks.length > 1 ? 's' : ''}`

  return (
    <AppLayout title={project.name} maxWidth="full" hideHeader={true}>
      <div className="h-full -m-4 sm:-m-6 lg:-m-8">
        <div
          className="relative overflow-x-hidden pt-8 pb-6 px-4 sm:pt-12 sm:pb-8 sm:px-6 min-h-[260px] sm:min-h-[340px]"
          style={{ background: heroGradient }}
        >
          <div className="max-w-7xl mx-auto">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="mb-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white/80 hover:text-white"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
              Retour aux projets
            </button>

            <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-end sm:text-left sm:gap-6">
              {project.coverLink ? (
                <img
                  src={project.coverLink}
                  alt={project.name}
                  className="size-32 shrink-0 rounded-xl object-cover shadow-2xl sm:size-40 md:size-48"
                />
              ) : (
                <div className="size-32 shrink-0 rounded-xl bg-white/10 flex items-center justify-center shadow-2xl sm:size-40 md:size-48">
                  <svg
                    className="size-16 text-white/50 sm:size-20"
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

              <div className="min-w-0 w-full max-w-full flex-1 pb-2 sm:pb-4">
                <div className="mb-2 flex justify-center sm:justify-start">
                  <span
                    className={`inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium ${ProjectTypeBadgeColors[project.type]}`}
                  >
                    {ProjectTypeLabels[project.type]}
                  </span>
                </div>
                <p className="mb-2 text-sm font-semibold text-white/90">
                  {ProjectCategoryLabels[project.category]}
                </p>
                <h1 className="text-3xl font-bold leading-tight text-white break-words sm:text-4xl md:text-5xl lg:text-6xl sm:leading-none">
                  {project.name}
                </h1>
                <p className="mt-2 text-sm font-medium text-white/90">
                  <ArtistLinks
                    artists={project.artists}
                    className="hover:text-white hover:underline focus:outline-hidden focus:underline"
                  />{' '}
                  · {formatReleaseDate(project.releaseDate)} · {tracksCountLabel} · {ProjectZoneLabels[project.zone]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {sortedTracks.length === 0 ? (
              <p className="text-sm text-gray-600">Aucun titre pour ce projet.</p>
            ) : (
              <div className="min-w-full">
                <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className="w-24 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                          Titre
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sortedTracks.map(track => (
                        <TrackRow key={track.id} track={track} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
