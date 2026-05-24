import type { ProjectCategory } from './ProjectCategory'
import type { ProjectType } from './ProjectType'
import type { ProjectZone } from './ProjectZone'
import type { TrackRequestDto } from './TrackRequestDto'

export interface ProjectRequestDto {
  name: string
  releaseDate: string
  type: ProjectType
  category: ProjectCategory
  zone: ProjectZone
  coverLink: string | null
  artistIds: string[]
  tracks: TrackRequestDto[]
}
