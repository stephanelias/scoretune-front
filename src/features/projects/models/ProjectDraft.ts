import type { ArtistSummaryDto } from './ArtistSummaryDto'
import type { ProjectCategory } from './ProjectCategory'
import { ProjectType } from './ProjectType'
import type { ProjectZone } from './ProjectZone'

export interface TrackDraft {
  trackNumber: number
  name: string
  interpreters: ArtistSummaryDto[]
  featurings: ArtistSummaryDto[]
}

export interface ProjectDraft {
  name: string
  releaseDate: string
  type: ProjectType
  category: ProjectCategory | ''
  zone: ProjectZone | ''
  coverLink: string
  artists: ArtistSummaryDto[]
  tracks: TrackDraft[]
}

export function createEmptyTrack(trackNumber: number): TrackDraft {
  return {
    trackNumber,
    name: '',
    interpreters: [],
    featurings: [],
  }
}

export function createInitialDraft(): ProjectDraft {
  return {
    name: '',
    releaseDate: '',
    type: ProjectType.SINGLE,
    category: '',
    zone: '',
    coverLink: '',
    artists: [],
    tracks: [createEmptyTrack(1)],
  }
}
