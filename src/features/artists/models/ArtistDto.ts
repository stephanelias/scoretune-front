import type { ArtistType } from './ArtistType'

export interface ArtistDto {
  id: string | null
  name: string
  type: ArtistType
  photoLink: string | null
}

export interface CreateArtistDto {
  name: string
  type: ArtistType
  photoLink: string | null
}

export interface UpdateArtistDto {
  name: string
  type: ArtistType
  photoLink: string | null
}
