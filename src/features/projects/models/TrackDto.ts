import type { ArtistSummaryDto } from './ArtistSummaryDto'

export interface TrackDto {
  id: string
  trackNumber: number
  name: string
  interpreters: ArtistSummaryDto[]
  featurings: ArtistSummaryDto[]
}
