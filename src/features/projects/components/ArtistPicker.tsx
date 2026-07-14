import { useMemo, useState } from 'react'

import SearchInput from '../../../components/ui/SearchInput'
import { useDebouncedValue } from '../../../core/hooks/useDebouncedValue'
import { getApiErrorMessage } from '../../../core/utils/getApiErrorMessage'
import { useArtists } from '../../artists/hooks/useArtists'
import { useCreateArtist } from '../../artists/hooks/useCreateArtist'
import type { ArtistDto } from '../../artists/models/ArtistDto'
import { ArtistType } from '../../artists/models/ArtistType'
import type { ArtistSummaryDto } from '../models/ArtistSummaryDto'

function toArtistSummary(artist: ArtistDto): ArtistSummaryDto {
  if (!artist.id) {
    throw new Error('Artiste sans identifiant')
  }

  return {
    id: artist.id,
    name: artist.name,
    type: artist.type,
    photoLink: artist.photoLink,
  }
}

interface ArtistPickerProps {
  label: string
  selected: ArtistSummaryDto[]
  onChange: (artists: ArtistSummaryDto[]) => void
  excludeIds?: string[]
}

export function ArtistPicker({ label, selected, onChange, excludeIds = [] }: ArtistPickerProps) {
  const [search, setSearch] = useState('')
  const [quickName, setQuickName] = useState('')
  const [quickError, setQuickError] = useState<string | null>(null)

  const debouncedSearch = useDebouncedValue(search.trim(), 300)
  const { data, isLoading } = useArtists({
    page: 0,
    size: 10,
    search: debouncedSearch || undefined,
  })
  const createArtist = useCreateArtist()

  const selectedIds = useMemo(() => new Set(selected.map(artist => artist.id)), [selected])
  const excludeSet = useMemo(() => new Set(excludeIds), [excludeIds])

  const results = useMemo(() => {
    const artists = data?.content ?? []
    return artists.filter(
      (artist): artist is ArtistDto & { id: string } =>
        artist.id != null && !selectedIds.has(artist.id) && !excludeSet.has(artist.id),
    )
  }, [data?.content, excludeSet, selectedIds])

  const addArtist = (artist: ArtistSummaryDto) => {
    onChange([...selected, artist])
    setSearch('')
  }

  const removeArtist = (artistId: string) => {
    onChange(selected.filter(artist => artist.id !== artistId))
  }

  const handleQuickCreate = async () => {
    const name = quickName.trim()
    if (!name) {
      setQuickError('Le nom est requis.')
      return
    }

    setQuickError(null)
    try {
      const created = await createArtist.mutateAsync({
        name,
        type: ArtistType.ARTIST,
        photoLink: null,
      })
      addArtist(toArtistSummary(created))
      setQuickName('')
    } catch (error) {
      setQuickError(getApiErrorMessage(error, 'Impossible de créer l’artiste.'))
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map(artist => (
            <span
              key={artist.id}
              className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {artist.name}
              <button
                type="button"
                className="shrink-0 size-4 inline-flex justify-center items-center rounded-full hover:bg-gray-200 text-gray-600"
                onClick={() => removeArtist(artist.id)}
                aria-label={`Retirer ${artist.name}`}
              >
                <svg
                  className="size-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un artiste…"
        className="max-w-md"
      />

      {debouncedSearch.length > 0 && (
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-w-md">
          {isLoading && (
            <p className="px-3 py-2 text-sm text-gray-500">Recherche…</p>
          )}
          {!isLoading && results.length === 0 && (
            <p className="px-3 py-2 text-sm text-gray-500">Aucun artiste trouvé.</p>
          )}
          {results.map(artist => (
            <button
              key={artist.id}
              type="button"
              className="w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
              onClick={() => addArtist(toArtistSummary(artist))}
            >
              {artist.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-end gap-2 max-w-md">
        <div className="grow">
          <label className="block text-xs text-gray-500 mb-1">Création rapide</label>
          <input
            type="text"
            value={quickName}
            onChange={event => setQuickName(event.target.value)}
            placeholder="Nom du nouvel artiste"
            className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
        <button
          type="button"
          disabled={createArtist.isPending}
          onClick={() => void handleQuickCreate()}
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50"
        >
          Créer
        </button>
      </div>
      {quickError && <p className="text-sm text-red-600">{quickError}</p>}
    </div>
  )
}
