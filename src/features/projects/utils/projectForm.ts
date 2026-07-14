import { createEmptyTrack, type ProjectDraft, type TrackDraft } from '../models/ProjectDraft'
import type { ProjectDto } from '../models/ProjectDto'
import type { ProjectRequestDto } from '../models/ProjectRequestDto'
import { ProjectType } from '../models/ProjectType'

export function projectDtoToDraft(project: ProjectDto): ProjectDraft {
  return {
    name: project.name,
    releaseDate: project.releaseDate,
    type: project.type,
    category: project.category,
    zone: project.zone,
    coverLink: project.coverLink ?? '',
    artists: project.artists,
    tracks: [...project.tracks]
      .sort((a, b) => a.trackNumber - b.trackNumber)
      .map(track => ({
        trackNumber: track.trackNumber,
        name: track.name,
        interpreters: track.interpreters,
        featurings: track.featurings,
      })),
  }
}

export function renumberTracks(tracks: TrackDraft[]): TrackDraft[] {
  return tracks.map((track, index) => ({
    ...track,
    trackNumber: index + 1,
  }))
}

export function createTracksForType(type: ProjectType, tracks: TrackDraft[]): TrackDraft[] {
  if (type === ProjectType.SINGLE) {
    const first = tracks[0] ?? createEmptyTrack(1)
    return [{ ...first, trackNumber: 1 }]
  }

  if (tracks.length === 0) {
    return [createEmptyTrack(1)]
  }

  return renumberTracks(tracks)
}

export function isTracklistEmpty(tracks: TrackDraft[]): boolean {
  return tracks.every(
    track =>
      !track.name.trim() &&
      track.interpreters.length === 0 &&
      track.featurings.length === 0,
  )
}

export function spotifyTracksToDraft(
  trackNames: string[],
  interpreters: ProjectDraft['artists'],
  type: ProjectType,
): TrackDraft[] {
  const names = type === ProjectType.SINGLE ? trackNames.slice(0, 1) : trackNames

  return names.map((name, index) => ({
    trackNumber: index + 1,
    name,
    interpreters: [...interpreters],
    featurings: [],
  }))
}

export function validateStep1(draft: ProjectDraft): string | null {
  if (!draft.name.trim()) return 'Le nom du projet est requis.'
  if (!draft.releaseDate) return 'La date de sortie est requise.'
  if (!draft.category) return 'La catégorie est requise.'
  if (!draft.zone) return 'La zone est requise.'
  return null
}

export function validateStep3(draft: ProjectDraft): string | null {
  if (draft.type === ProjectType.SINGLE && draft.tracks.length !== 1) {
    return 'Un single doit contenir exactement un titre.'
  }

  if (draft.tracks.length === 0) {
    return 'Au moins un titre est requis.'
  }

  for (const track of draft.tracks) {
    if (!track.name.trim()) {
      return `Le titre ${track.trackNumber} doit avoir un nom.`
    }

    if (track.interpreters.length === 0) {
      return `Le titre ${track.trackNumber} doit avoir au moins un interprète.`
    }

    const interpreterIds = new Set(track.interpreters.map(artist => artist.id))
    const duplicate = track.featurings.some(artist => interpreterIds.has(artist.id))
    if (duplicate) {
      return `Le titre ${track.trackNumber} ne peut pas avoir le même artiste en interprète et en featuring.`
    }
  }

  return null
}

export function draftToRequest(draft: ProjectDraft): ProjectRequestDto {
  return {
    name: draft.name.trim(),
    releaseDate: draft.releaseDate,
    type: draft.type,
    category: draft.category as ProjectRequestDto['category'],
    zone: draft.zone as ProjectRequestDto['zone'],
    coverLink: draft.coverLink.trim() || null,
    artistIds: draft.artists.map(artist => artist.id),
    tracks: draft.tracks.map(track => ({
      trackNumber: track.trackNumber,
      name: track.name.trim(),
      interpreterIds: track.interpreters.map(artist => artist.id),
      featuringIds: track.featurings.map(artist => artist.id),
    })),
  }
}
