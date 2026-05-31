import { useQuery } from '@tanstack/react-query'

import { ArtistService } from '../services/ArtistService'

export const useArtistAppearances = (artistId: string, page: number, size: number) => {
  return useQuery({
    queryKey: ['artist-appearances', artistId, page, size],
    queryFn: () =>
      ArtistService.getArtistAppearances({
        artistId,
        page: page - 1,
        size,
      }),
    enabled: Boolean(artistId),
  })
}
