import { useNavigate } from 'react-router-dom'

import type { ProjectSummaryDto } from '../models/ProjectSummaryDto'
import { ProjectTypeBadgeColors, ProjectTypeLabels } from '../models/ProjectType'

interface ProjectCardProps {
  project: ProjectSummaryDto
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate()
  const artistNames =
    project.artists.length > 0 ? project.artists.map(artist => artist.name).join(', ') : 'Artiste inconnu'

  return (
    <button
      type="button"
      onClick={() => navigate(`/projects/${project.id}`)}
      className="flex flex-col w-full text-left bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow overflow-hidden"
    >
      {project.coverLink ? (
        <img
          src={project.coverLink}
          alt={project.name}
          className="w-full aspect-square object-cover"
        />
      ) : (
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
          <svg
            className="size-16 text-gray-400"
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

      <div className="p-4 flex flex-col gap-2 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{project.name}</h3>

        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`shrink-0 inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium ${ProjectTypeBadgeColors[project.type]}`}
          >
            {ProjectTypeLabels[project.type]}
          </span>
          <p className="min-w-0 truncate text-sm text-gray-600">{artistNames}</p>
        </div>
      </div>
    </button>
  )
}
