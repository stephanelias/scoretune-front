import ProjectCard from '../../projects/components/ProjectCard'
import type { ProjectSummaryDto } from '../../projects/models/ProjectSummaryDto'

interface ArtistProjectGridProps {
  projects: ProjectSummaryDto[]
  isLoading: boolean
  emptyTitle: string
  emptyDescription: string
}

export default function ArtistProjectGrid({
  projects,
  isLoading,
  emptyTitle,
  emptyDescription,
}: ArtistProjectGridProps) {
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

  if (projects.length === 0) {
    return (
      <div className="max-w-sm mx-auto text-center py-16">
        <svg
          className="size-16 mx-auto text-gray-400 mb-4"
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
          <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{emptyTitle}</h3>
        <p className="text-gray-600">{emptyDescription}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
