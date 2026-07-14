import { useState } from 'react'
import { Link } from 'react-router-dom'

import { getApiErrorMessage } from '../../../core/utils/getApiErrorMessage'
import { closeOverlay, openOverlay } from '../../../core/utils/overlay'
import { ArtistPicker } from './ArtistPicker'
import { SpotifyLookupButton } from '../../spotify/components/SpotifyLookupButton'
import {
  SPOTIFY_TRACKLIST_DRAFT_MODAL_ID,
  SpotifyTracklistDraftModal,
} from '../../spotify/components/SpotifyTracklistDraftModal'
import { useSpotifyProjectTracklist } from '../../spotify/hooks/useSpotifyLookup'
import type { SpotifyProjectTrackDto } from '../../spotify/models/SpotifyProjectTracklistDto'
import { createEmptyTrack, type ProjectDraft, type TrackDraft } from '../models/ProjectDraft'
import { ProjectCategory, ProjectCategoryLabels } from '../models/ProjectCategory'
import { ProjectType, ProjectTypeLabels } from '../models/ProjectType'
import { ProjectZone, ProjectZoneLabels } from '../models/ProjectZone'
import {
  createTracksForType,
  isTracklistEmpty,
  renumberTracks,
  spotifyTracksToDraft,
  validateStep1,
  validateStep3,
} from '../utils/projectForm'

const STEPS = [
  { number: 1, title: 'Infos projet' },
  { number: 2, title: 'Artistes principaux' },
  { number: 3, title: 'Titres' },
] as const

interface ProjectFormStepperProps {
  backLink: { to: string; label: string }
  initialDraft: ProjectDraft
  submitLabel: string
  submittingLabel: string
  isSubmitting: boolean
  submitError: string | null
  onSubmit: (draft: ProjectDraft) => Promise<void>
}

export function ProjectFormStepper({
  backLink,
  initialDraft,
  submitLabel,
  submittingLabel,
  isSubmitting,
  submitError,
  onSubmit,
}: ProjectFormStepperProps) {
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState<ProjectDraft>(initialDraft)
  const [stepError, setStepError] = useState<string | null>(null)
  const [spotifyError, setSpotifyError] = useState<string | null>(null)
  const [spotifyDraftTracks, setSpotifyDraftTracks] = useState<SpotifyProjectTrackDto[]>([])
  const [spotifyTracklistError, setSpotifyTracklistError] = useState<string | null>(null)

  const spotifyTracklist = useSpotifyProjectTracklist()
  const tracklistIsEmpty = isTracklistEmpty(draft.tracks)
  const canImportFromSpotify =
    draft.name.trim().length > 0 && draft.artists.length > 0 && tracklistIsEmpty

  const updateDraft = (patch: Partial<ProjectDraft>) => {
    setDraft(current => ({ ...current, ...patch }))
  }

  const handleTypeChange = (type: ProjectType) => {
    setDraft(current => ({
      ...current,
      type,
      tracks: createTracksForType(type, current.tracks),
    }))
  }

  const updateTrack = (index: number, patch: Partial<TrackDraft>) => {
    setDraft(current => ({
      ...current,
      tracks: current.tracks.map((track, trackIndex) =>
        trackIndex === index ? { ...track, ...patch } : track,
      ),
    }))
  }

  const addTrack = () => {
    setDraft(current => ({
      ...current,
      tracks: renumberTracks([...current.tracks, createEmptyTrack(current.tracks.length + 1)]),
    }))
  }

  const removeTrack = (index: number) => {
    setDraft(current => ({
      ...current,
      tracks: renumberTracks(current.tracks.filter((_, trackIndex) => trackIndex !== index)),
    }))
  }

  const goNext = () => {
    setStepError(null)

    if (step === 1) {
      const error = validateStep1(draft)
      if (error) {
        setStepError(error)
        return
      }
    }

    setStep(current => Math.min(current + 1, 3))
  }

  const goBack = () => {
    setStepError(null)
    setStep(current => Math.max(current - 1, 1))
  }

  const handleSubmit = async () => {
    setStepError(null)

    const step1Error = validateStep1(draft)
    if (step1Error) {
      setStepError(step1Error)
      setStep(1)
      return
    }

    const step3Error = validateStep3(draft)
    if (step3Error) {
      setStepError(step3Error)
      setStep(3)
      return
    }

    await onSubmit(draft)
  }

  const isSingle = draft.type === ProjectType.SINGLE

  const handleSpotifyTracklistImport = () => {
    if (!canImportFromSpotify) return

    setSpotifyTracklistError(null)
    setSpotifyDraftTracks([])
    openOverlay(SPOTIFY_TRACKLIST_DRAFT_MODAL_ID)

    spotifyTracklist.mutate(
      {
        name: draft.name.trim(),
        artists: draft.artists.map(artist => artist.name),
      },
      {
        onSuccess: data => setSpotifyDraftTracks(data.tracks),
        onError: error =>
          setSpotifyTracklistError(
            getApiErrorMessage(error, 'Impossible de récupérer la tracklist Spotify.'),
          ),
      },
    )
  }

  const handleConfirmSpotifyTracklist = () => {
    if (!tracklistIsEmpty || spotifyDraftTracks.length === 0) return

    updateDraft({
      tracks: spotifyTracksToDraft(
        spotifyDraftTracks.map(track => track.name),
        draft.artists,
        draft.type,
      ),
    })
    setSpotifyDraftTracks([])
    setSpotifyTracklistError(null)
    closeOverlay(SPOTIFY_TRACKLIST_DRAFT_MODAL_ID)
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <Link
          to={backLink.to}
          className="text-sm text-gray-500 hover:text-gray-800 hover:underline"
        >
          {backLink.label}
        </Link>
      </div>

      <div data-hs-stepper className="mx-auto w-full max-w-3xl">
        <ul className="relative flex flex-row gap-x-2">
          {STEPS.map(item => (
            <li
              key={item.number}
              className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${
                step === item.number ? 'active' : ''
              } ${step > item.number ? 'success' : ''}`}
              data-hs-stepper-nav-item={JSON.stringify({ index: item.number })}
            >
              <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-600 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-gray-800 hs-stepper-active:text-white hs-stepper-success:bg-gray-800 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                  <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                    {item.number}
                  </span>
                  <svg
                    className="hidden shrink-0 size-3 hs-stepper-success:block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="ms-2 text-sm font-medium text-gray-800">{item.title}</span>
              </span>
              <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-gray-800 hs-stepper-completed:bg-teal-600" />
            </li>
          ))}
        </ul>

        <div className="mt-5 sm:mt-8">
          <div
            data-hs-stepper-content-item={JSON.stringify({ index: 1 })}
            style={{ display: step === 1 ? undefined : 'none' }}
          >
            <section className="mx-auto max-w-xl space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Informations du projet</h2>

              <div>
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={draft.name}
                  onChange={event => updateDraft({ name: event.target.value })}
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="release-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de sortie
                </label>
                <input
                  id="release-date"
                  type="date"
                  value={draft.releaseDate}
                  onChange={event => updateDraft({ releaseDate: event.target.value })}
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="project-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="project-type"
                  value={draft.type}
                  onChange={event => handleTypeChange(event.target.value as ProjectType)}
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                >
                  {Object.values(ProjectType).map(type => (
                    <option key={type} value={type}>
                      {ProjectTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="project-category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Catégorie
                </label>
                <select
                  id="project-category"
                  value={draft.category}
                  onChange={event =>
                    updateDraft({ category: event.target.value as ProjectDraft['category'] })
                  }
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                >
                  <option value="">Sélectionner…</option>
                  {Object.values(ProjectCategory).map(category => (
                    <option key={category} value={category}>
                      {ProjectCategoryLabels[category]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="project-zone" className="block text-sm font-medium text-gray-700 mb-1">
                  Zone
                </label>
                <select
                  id="project-zone"
                  value={draft.zone}
                  onChange={event => updateDraft({ zone: event.target.value as ProjectDraft['zone'] })}
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                >
                  <option value="">Sélectionner…</option>
                  {Object.values(ProjectZone).map(zone => (
                    <option key={zone} value={zone}>
                      {ProjectZoneLabels[zone]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="cover-link" className="block text-sm font-medium text-gray-700 mb-1">
                  Lien de la cover (optionnel)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    id="cover-link"
                    type="url"
                    value={draft.coverLink}
                    onChange={event => updateDraft({ coverLink: event.target.value })}
                    placeholder="https://…"
                    className="py-2 px-3 block min-w-0 flex-1 border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                  <SpotifyLookupButton
                    mode="project"
                    name={draft.name}
                    artists={draft.artists.map(artist => artist.name)}
                    onSuccess={coverUrl => updateDraft({ coverLink: coverUrl })}
                    onErrorChange={setSpotifyError}
                    disabled={!draft.name.trim()}
                  />
                </div>
                {spotifyError && <p className="mt-1 text-xs text-red-600">{spotifyError}</p>}
                {draft.coverLink && (
                  <img
                    src={draft.coverLink}
                    alt="Aperçu cover"
                    className="mt-2 size-16 rounded-lg object-cover border border-gray-200"
                  />
                )}
                {draft.artists.length === 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Ajoutez les artistes à l&apos;étape 2 pour affiner la recherche Spotify.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div
            data-hs-stepper-content-item={JSON.stringify({ index: 2 })}
            style={{ display: step === 2 ? undefined : 'none' }}
          >
            <section className="mx-auto max-w-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Artistes principaux</h2>
              <p className="text-sm text-gray-500 mb-4">
                Les artistes associés au projet (optionnel). Vous pourrez aussi définir des
                interprètes par titre à l’étape suivante.
              </p>
              <ArtistPicker
                label="Artistes du projet"
                selected={draft.artists}
                onChange={artists => updateDraft({ artists })}
              />
            </section>
          </div>

          <div
            data-hs-stepper-content-item={JSON.stringify({ index: 3 })}
            style={{ display: step === 3 ? undefined : 'none' }}
          >
            <section className="mx-auto max-w-3xl space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-800">Titres</h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSpotifyTracklistImport}
                    disabled={!canImportFromSpotify || spotifyTracklist.isPending}
                    title="Importer depuis Spotify"
                    className="inline-flex shrink-0 items-center justify-center size-7 rounded-full bg-[#1DB954] text-white hover:bg-[#1ed760] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {spotifyTracklist.isPending ? (
                      <span
                        className="animate-spin inline-block size-2.5 border-2 border-current border-t-transparent rounded-full"
                        role="status"
                        aria-label="loading"
                      />
                    ) : (
                      <svg className="size-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.13-10.56-1.147-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.026zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    )}
                  </button>
                  {!isSingle && (
                    <button
                      type="button"
                      onClick={addTrack}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                    >
                      Ajouter un titre
                    </button>
                  )}
                </div>
              </div>

              {draft.artists.length === 0 && (
                <p className="text-xs text-gray-500">
                  Ajoutez des artistes principaux à l&apos;étape 2 pour importer depuis Spotify.
                </p>
              )}
              {draft.artists.length > 0 && !tracklistIsEmpty && (
                <p className="text-xs text-gray-500">
                  La tracklist contient déjà des titres. L&apos;import Spotify n&apos;est disponible
                  que sur une tracklist vide.
                </p>
              )}

              {draft.tracks.map((track, index) => (
                <div
                  key={`${track.trackNumber}-${index}`}
                  className="border border-gray-200 rounded-xl p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-800">Titre {track.trackNumber}</h3>
                    {!isSingle && draft.tracks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTrack(index)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du titre
                    </label>
                    <input
                      type="text"
                      value={track.name}
                      onChange={event => updateTrack(index, { name: event.target.value })}
                      className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>

                  <ArtistPicker
                    label="Interprètes"
                    selected={track.interpreters}
                    onChange={interpreters => updateTrack(index, { interpreters })}
                    excludeIds={track.featurings.map(artist => artist.id)}
                  />

                  <ArtistPicker
                    label="Featurings (optionnel)"
                    selected={track.featurings}
                    onChange={featurings => updateTrack(index, { featurings })}
                    excludeIds={track.interpreters.map(artist => artist.id)}
                  />
                </div>
              ))}
            </section>
          </div>

          <div
            data-hs-stepper-content-item={JSON.stringify({ isFinal: true })}
            style={{ display: 'none' }}
          />

          {(stepError || submitError) && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {stepError ?? submitError}
            </div>
          )}

          <div className="mx-auto mt-5 flex max-w-xl justify-between items-center gap-x-2">
            <button
              type="button"
              disabled={step === 1}
              onClickCapture={event => {
                event.preventDefault()
                event.stopPropagation()
                event.nativeEvent.stopImmediatePropagation()
                goBack()
              }}
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-800 shadow-xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-back-btn
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
              Retour
            </button>

            <button
              type="button"
              onClickCapture={event => {
                event.preventDefault()
                event.stopPropagation()
                event.nativeEvent.stopImmediatePropagation()
                goNext()
              }}
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-gray-800 border border-gray-800 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-next-btn
              style={{ display: step < 3 ? undefined : 'none' }}
            >
              Suivant
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClickCapture={event => {
                event.preventDefault()
                event.stopPropagation()
                event.nativeEvent.stopImmediatePropagation()
                void handleSubmit()
              }}
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-gray-800 border border-gray-800 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-finish-btn
              style={{ display: step === 3 ? undefined : 'none' }}
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </button>

            <button
              type="reset"
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-gray-800 border border-gray-800 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-reset-btn
              style={{ display: 'none' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <SpotifyTracklistDraftModal
        tracks={spotifyDraftTracks}
        interpreters={draft.artists}
        isLoading={spotifyTracklist.isPending}
        error={spotifyTracklistError}
        onConfirm={handleConfirmSpotifyTracklist}
      />
    </div>
  )
}
