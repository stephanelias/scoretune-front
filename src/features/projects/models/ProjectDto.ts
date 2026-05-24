import type { ArtistSummaryDto } from './ArtistSummaryDto'
import type { ProjectCategory } from './ProjectCategory'
import type { ProjectType } from './ProjectType'
import type { ProjectZone } from './ProjectZone'
import type { TrackDto } from './TrackDto'

export interface ProjectDto {
  id: string
  name: string
  releaseDate: string
  type: ProjectType
  category: ProjectCategory
  zone: ProjectZone
  coverLink: string | null
  artists: ArtistSummaryDto[]
  tracks: TrackDto[]
}
