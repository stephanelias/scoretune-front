import { type FormEvent, useEffect, useState } from 'react'

import { ArtistType, ArtistTypeLabels } from '../models/ArtistType'
import type { ArtistDto, CreateArtistDto, UpdateArtistDto } from '../models/ArtistDto'
import { SpotifyLookupButton } from '../../spotify/components/SpotifyLookupButton'

interface ArtistFormModalProps {
  modalId: string
  artist?: ArtistDto | null
  onSubmit: (artist: CreateArtistDto | UpdateArtistDto) => void
  isSubmitting: boolean
  submitError?: string | null
  onClearSubmitError?: () => void
}

export default function ArtistFormModal({
  modalId,
  artist,
  onSubmit,
  isSubmitting,
  submitError,
  onClearSubmitError,
}: ArtistFormModalProps) {
  const [formValues, setFormValues] = useState<{
    name: string
    type: ArtistType
    photoLink: string
  }>({
    name: '',
    type: ArtistType.ARTIST,
    photoLink: '',
  })

  const isEditMode = !!artist

  const [spotifyError, setSpotifyError] = useState<string | null>(null)

  useEffect(() => {
    if (artist) {
      setFormValues({
        name: artist.name,
        type: artist.type,
        photoLink: artist.photoLink || '',
      })
    } else {
      setFormValues({
        name: '',
        type: ArtistType.ARTIST,
        photoLink: '',
      })
    }

    setSpotifyError(null)

    // Initialize Preline select
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit(['select'])
    }
  }, [artist])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formValues.name,
      type: formValues.type,
      photoLink: formValues.photoLink || null,
    })
  }

  return (
    <div
      id={modalId}
      className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabIndex={-1}
      aria-labelledby={`${modalId}-label`}
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
            <h3 id={`${modalId}-label`} className="font-bold text-gray-800">
              {isEditMode ? "Modifier l'artiste" : 'Nouvel artiste'}
            </h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Close"
              data-hs-overlay={`#${modalId}`}
            >
              <span className="sr-only">Close</span>
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
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-4 overflow-y-auto">
              <div className="space-y-4">
                {submitError && (
                  <div
                    className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-3"
                    role="alert"
                  >
                    {submitError}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    value={formValues.name}
                    onChange={e => {
                      onClearSubmitError?.()
                      setFormValues({ ...formValues, name: e.target.value })
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-2">
                    Type *
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      data-hs-select='{
                        "placeholder": "Sélectionner un type...",
                        "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-3 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
                        "optionClasses": "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-4 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div>",
                        "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                      }'
                      className="hidden"
                      required
                      value={formValues.type}
                      onChange={e =>
                        setFormValues({ ...formValues, type: e.target.value as ArtistType })
                      }
                    >
                      <option value="">Choisir...</option>
                      {Object.entries(ArtistTypeLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="photoLink" className="block text-sm font-medium mb-2">
                    Lien photo
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="url"
                      id="photoLink"
                      name="photoLink"
                      className="py-2 px-3 block min-w-0 flex-1 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="https://exemple.com/photo.jpg"
                      value={formValues.photoLink}
                      onChange={e => setFormValues({ ...formValues, photoLink: e.target.value })}
                    />
                    <SpotifyLookupButton
                      mode="artist"
                      name={formValues.name}
                      onSuccess={photoUrl => setFormValues(current => ({ ...current, photoLink: photoUrl }))}
                      onErrorChange={setSpotifyError}
                      disabled={!formValues.name.trim()}
                    />
                  </div>
                  {spotifyError && <p className="mt-1 text-xs text-red-600">{spotifyError}</p>}
                  {formValues.photoLink && (
                    <img
                      src={formValues.photoLink}
                      alt="Aperçu photo"
                      className="mt-2 size-16 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay={`#${modalId}`}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span
                    className="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  ></span>
                )}
                {isEditMode ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
