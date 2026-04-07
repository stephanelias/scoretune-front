export const ArtistType = {
  ARTIST: 'ARTIST',
  PRODUCER: 'PRODUCER',
  GROUP: 'GROUP',
  LABEL: 'LABEL',
} as const

export type ArtistType = (typeof ArtistType)[keyof typeof ArtistType]

export const ArtistTypeLabels: Record<ArtistType, string> = {
  [ArtistType.ARTIST]: 'Artiste',
  [ArtistType.PRODUCER]: 'Producteur',
  [ArtistType.GROUP]: 'Groupe',
  [ArtistType.LABEL]: 'Label',
}

export const ArtistTypeBadgeColors: Record<ArtistType, string> = {
  [ArtistType.ARTIST]: 'bg-blue-100 text-blue-800',
  [ArtistType.PRODUCER]: 'bg-purple-100 text-purple-800',
  [ArtistType.GROUP]: 'bg-green-100 text-green-800',
  [ArtistType.LABEL]: 'bg-orange-100 text-orange-800',
}
