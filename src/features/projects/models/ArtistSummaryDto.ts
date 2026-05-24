import type { ArtistType } from '../../artists/models/ArtistType'

export interface ArtistSummaryDto {
  id: string
  name: string
  type: ArtistType
  photoLink: string | null
}
