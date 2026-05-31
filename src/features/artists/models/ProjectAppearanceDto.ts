import type { ArtistSummaryDto } from '../../projects/models/ArtistSummaryDto'

export interface ProjectAppearanceDto {
  trackId: string
  trackName: string
  trackNumber: number
  projectId: string
  projectName: string
  projectCoverLink: string | null
  interpreters: ArtistSummaryDto[]
  featurings: ArtistSummaryDto[]
}
