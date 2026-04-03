import { useState } from 'react'

import AppLayout from '../../components/ui/AppLayout'
import { useAuth } from '../../core/contexts/AuthContext'

import ArtistCard from './components/ArtistCard'
import ArtistFormModal from './components/ArtistFormModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import { useArtists } from './hooks/useArtists'
import { useCreateArtist } from './hooks/useCreateArtist'
import { useDeleteArtist } from './hooks/useDeleteArtist'
import { useUpdateArtist } from './hooks/useUpdateArtist'
import type { ArtistDto, CreateArtistDto, UpdateArtistDto } from './models/ArtistDto'

export default function ArtistsPage() {
  const { user } = useAuth()
  const { data: artists, isLoading, isError } = useArtists()

  console.log('🌐 VITE_API_URL:', import.meta.env.VITE_API_URL)
  console.log('🎨 Artists data:', artists, 'Length:', artists?.length)
  console.log('⏳ Loading:', isLoading)
  console.log('❌ Error:', isError)
  console.log('📊 Type:', Array.isArray(artists) ? 'Array' : typeof artists)
  const createArtist = useCreateArtist()
  const updateArtist = useUpdateArtist()
  const deleteArtist = useDeleteArtist()

  const [selectedArtist, setSelectedArtist] = useState<ArtistDto | null>(null)
  const [artistToDelete, setArtistToDelete] = useState<ArtistDto | null>(null)

  // Vérifier si l'utilisateur peut modifier/supprimer
  const canEdit =
    (user?.roles?.includes('ROLE_ADMIN') || user?.roles?.includes('ROLE_MODO')) ?? false

  const handleCreateOrUpdate = (artist: CreateArtistDto | UpdateArtistDto) => {
    if (selectedArtist?.id) {
      // Update
      updateArtist.mutate(
        { id: selectedArtist.id, artist },
        {
          onSuccess: () => {
            setSelectedArtist(null)
            // Close modal using Preline API
            const modal = document.getElementById('artist-form-modal')
            if (modal) {
              // @ts-expect-error - Preline HSOverlay API
              window.HSOverlay.close(modal)
            }
          },
        },
      )
    } else {
      // Create
      createArtist.mutate(artist, {
        onSuccess: () => {
          setSelectedArtist(null)
          // Close modal using Preline API
          const modal = document.getElementById('artist-form-modal')
          if (modal) {
            // @ts-expect-error - Preline HSOverlay API
            window.HSOverlay.close(modal)
          }
        },
      })
    }
  }

  const handleEdit = (artist: ArtistDto) => {
    setSelectedArtist(artist)
  }

  const handleDelete = (artist: ArtistDto) => {
    setArtistToDelete(artist)
  }

  const confirmDelete = () => {
    if (artistToDelete?.id) {
      deleteArtist.mutate(artistToDelete.id, {
        onSuccess: () => {
          setArtistToDelete(null)
          // Close modal using Preline API
          const modal = document.getElementById('delete-confirm-modal')
          if (modal) {
            // @ts-expect-error - Preline HSOverlay API
            window.HSOverlay.close(modal)
          }
        },
      })
    }
  }

  const handleNewArtist = () => {
    setSelectedArtist(null)
  }

  if (isError) {
    return (
      <AppLayout title="Artistes" maxWidth="7xl">
        <div
          className="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4"
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
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </div>
            <div className="ms-3">
              <span className="font-bold">Erreur !</span> Impossible de charger les artistes.
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Artistes" maxWidth="7xl">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Liste des artistes</h2>
          {canEdit && (
            <button
              type="button"
              onClick={handleNewArtist}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-overlay="#artist-form-modal"
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
              Nouvel artiste
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span
              className="animate-spin inline-block size-8 border-4 border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
              aria-label="loading"
            ></span>
          </div>
        ) : artists && artists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {artists.map(artist => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onEdit={handleEdit}
                onDelete={handleDelete}
                canEdit={canEdit}
              />
            ))}
          </div>
        ) : (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-4 text-sm font-semibold text-gray-800">Aucun artiste</h3>
            <p className="mt-1 text-sm text-gray-600">
              Commencez par créer votre premier artiste.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ArtistFormModal
        modalId="artist-form-modal"
        artist={selectedArtist}
        onSubmit={handleCreateOrUpdate}
        isSubmitting={createArtist.isPending || updateArtist.isPending}
      />

      <DeleteConfirmModal
        modalId="delete-confirm-modal"
        artistName={artistToDelete?.name || ''}
        onConfirm={confirmDelete}
        isDeleting={deleteArtist.isPending}
      />
    </AppLayout>
  )
}
