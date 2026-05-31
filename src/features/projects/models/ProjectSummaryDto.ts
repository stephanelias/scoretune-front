import type { ArtistSummaryDto } from './ArtistSummaryDto'
import type { ProjectCategory } from './ProjectCategory'
import type { ProjectType } from './ProjectType'
import type { ProjectZone } from './ProjectZone'

export interface ProjectSummaryDto {
  id: string
  name: string
  releaseDate: string
  type: ProjectType
  category: ProjectCategory
  zone: ProjectZone
  coverLink: string | null
  artists: ArtistSummaryDto[]
}
