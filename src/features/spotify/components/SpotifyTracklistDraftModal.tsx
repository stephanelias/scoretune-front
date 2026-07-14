import Modal from '../../../components/ui/Modal'
import type { ArtistSummaryDto } from '../../projects/models/ArtistSummaryDto'
import { SPOTIFY_TRACKLIST_DRAFT_MODAL_ID } from '../constants/spotifyTracklistDraftModalId'
import type { SpotifyProjectTrackDto } from '../models/SpotifyProjectTracklistDto'

interface SpotifyTracklistDraftModalProps {
  tracks: SpotifyProjectTrackDto[]
  interpreters: ArtistSummaryDto[]
  isLoading?: boolean
  error?: string | null
  onConfirm: () => void
}

export function SpotifyTracklistDraftModal({
  tracks,
  interpreters,
  isLoading = false,
  error,
  onConfirm,
}: SpotifyTracklistDraftModalProps) {
  const interpreterNames = interpreters.map(artist => artist.name).join(', ')

  return (
    <Modal
      modalId={SPOTIFY_TRACKLIST_DRAFT_MODAL_ID}
      title="Brouillon Spotify"
      maxWidth="2xl"
      footer={
        <>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-overlay={`#${SPOTIFY_TRACKLIST_DRAFT_MODAL_ID}`}
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading || tracks.length === 0}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
          >
            Valider
          </button>
        </>
      }
    >
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <span
            className="animate-spin inline-block size-6 border-2 border-current border-t-transparent text-gray-800 rounded-full"
            role="status"
            aria-label="loading"
          />
        </div>
      ) : tracks.length === 0 ? (
        <p className="text-sm text-gray-600">Aucun titre trouvé sur Spotify.</p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Vérifiez le brouillon avant de l&apos;importer dans le projet.
          </p>
          <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg">
            {tracks.map((track, index) => (
              <li key={`${track.name}-${index}`} className="px-4 py-3">
                <p className="text-sm font-medium text-gray-800">
                  {index + 1}. {track.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Interprètes : {interpreterNames || '—'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  )
}
