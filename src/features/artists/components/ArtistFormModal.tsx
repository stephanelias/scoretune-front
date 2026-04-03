import { type FormEvent, useEffect, useState } from 'react'

import { ArtistType, ArtistTypeLabels } from '../models/ArtistType'
import type { ArtistDto, CreateArtistDto, UpdateArtistDto } from '../models/ArtistDto'

interface ArtistFormModalProps {
  modalId: string
  artist?: ArtistDto | null
  onSubmit: (artist: CreateArtistDto | UpdateArtistDto) => void
  isSubmitting: boolean
}

export default function ArtistFormModal({
  modalId,
  artist,
  onSubmit,
  isSubmitting,
}: ArtistFormModalProps) {
  const [formValues, setFormValues] = useState({
    name: '',
    type: ArtistType.ARTIST,
    photoLink: '',
  })

  const isEditMode = !!artist

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
                    onChange={e => setFormValues({ ...formValues, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-2">
                    Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="py-2 px-3 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    value={formValues.type}
                    onChange={e =>
                      setFormValues({ ...formValues, type: e.target.value as ArtistType })
                    }
                  >
                    {Object.entries(ArtistTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="photoLink" className="block text-sm font-medium mb-2">
                    Lien photo
                  </label>
                  <input
                    type="url"
                    id="photoLink"
                    name="photoLink"
                    className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="https://exemple.com/photo.jpg"
                    value={formValues.photoLink}
                    onChange={e => setFormValues({ ...formValues, photoLink: e.target.value })}
                  />
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
