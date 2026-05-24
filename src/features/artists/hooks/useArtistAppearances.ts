import { useQuery } from '@tanstack/react-query'

import { ArtistService } from '../services/ArtistService'

export const useArtistAppearances = (artistId: string) => {
  return useQuery({
    queryKey: ['artist-appearances', artistId],
    queryFn: () =>
      ArtistService.getArtistAppearances({
        artistId,
        page: 0,
        size: 24,
      }),
    enabled: Boolean(artistId),
  })
}
