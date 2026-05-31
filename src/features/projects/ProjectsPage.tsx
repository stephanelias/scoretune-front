import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AppLayout from '../../components/ui/AppLayout'
import Pagination from '../../components/ui/Pagination'
import SearchInput from '../../components/ui/SearchInput'
import { useAuth } from '../../core/contexts/AuthContext'
import { useDebouncedValue } from '../../core/hooks/useDebouncedValue'

import ProjectCard from './components/ProjectCard'
import { useProjects } from './hooks/useProjects'

const PAGE_SIZE = 12

export default function ProjectsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebouncedValue(searchQuery.trim(), 300)

  const { data, isLoading, isError, isFetching } = useProjects({
    page: page - 1,
    size: PAGE_SIZE,
    search: debouncedSearch || undefined,
  })

  const canEdit =
    (user?.roles?.includes('ROLE_ADMIN') || user?.roles?.includes('ROLE_MODO')) ?? false

  const projects = data?.content ?? []
  const totalPages = data?.totalPages ?? 0
  const hasSearch = debouncedSearch.length > 0
  const isEmptyCatalog = !isLoading && data?.totalElements === 0 && !hasSearch
  const isNoResults = !isLoading && data?.totalElements === 0 && hasSearch

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  if (isError) {
    return (
      <AppLayout title="Projets" maxWidth="7xl">
        <div className="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4" role="alert">
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
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </div>
            <div className="ms-3">
              <span className="font-bold">Erreur !</span> Impossible de charger les projets.
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Projets" maxWidth="7xl">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Liste des projets</h2>
          {canEdit && (
            <Link
              to="/projects/new"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900"
            >
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouveau projet
            </Link>
          )}
        </div>

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher un projet…"
          className="mb-6"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span
              className="animate-spin inline-block size-8 border-4 border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
              aria-label="loading"
            ></span>
          </div>
        ) : isEmptyCatalog ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto size-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <h3 className="mt-4 text-sm font-semibold text-gray-800">Aucun projet</h3>
            <p className="mt-1 text-sm text-gray-600">
              Commencez par créer votre premier projet.
            </p>
          </div>
        ) : isNoResults ? (
          <div className="text-center py-12">
            <h3 className="text-sm font-semibold text-gray-800">Aucun résultat</h3>
            <p className="mt-1 text-sm text-gray-600">
              Aucun projet ne correspond à « {debouncedSearch} ».
            </p>
          </div>
        ) : (
          <>
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}
            >
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="flex shrink-0 justify-center border-t border-gray-100 py-6 mt-6">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                disabled={isFetching}
              />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
