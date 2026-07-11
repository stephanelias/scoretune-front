import { useEffect, useState } from 'react'

import { getApiErrorMessage } from '../../../core/utils/getApiErrorMessage'
import { SpotifyService } from '../services/SpotifyService'

interface SpotifyLookupButtonProps {
  mode: 'artist' | 'project'
  name: string
  artists?: string[]
  onSuccess: (url: string) => void
  onErrorChange?: (message: string | null) => void
  disabled?: boolean
}

function SpotifyIcon() {
  return (
    <svg className="size-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.13-10.56-1.147-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.026zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

export function SpotifyLookupButton({
  mode,
  name,
  artists = [],
  onSuccess,
  onErrorChange,
  disabled = false,
}: SpotifyLookupButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const trimmedName = name.trim()
  const trimmedArtists = artists.map(artist => artist.trim()).filter(Boolean)
  const isDisabled = disabled || isLoading || !trimmedName

  useEffect(() => {
    onErrorChange?.(error)
  }, [error, onErrorChange])

  useEffect(() => {
    return () => onErrorChange?.(null)
  }, [onErrorChange])

  const handleClick = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const url =
        mode === 'artist'
          ? await SpotifyService.getArtistPhoto(trimmedName)
          : await SpotifyService.getProjectCover(trimmedName, trimmedArtists)

      onSuccess(url)
    } catch (lookupError) {
      const fallback =
        mode === 'artist'
          ? 'Impossible de récupérer la photo Spotify.'
          : 'Impossible de récupérer la cover Spotify.'

      setError(getApiErrorMessage(lookupError, fallback))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={isDisabled}
      title="Rechercher sur Spotify"
      aria-label="Rechercher sur Spotify"
      className="inline-flex shrink-0 items-center justify-center size-7 rounded-full bg-[#1DB954] text-white hover:bg-[#1ed760] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    >
      {isLoading ? (
        <span
          className="animate-spin inline-block size-2.5 border-2 border-current border-t-transparent rounded-full"
          role="status"
          aria-label="loading"
        />
      ) : (
        <SpotifyIcon />
      )}
    </button>
  )
}
