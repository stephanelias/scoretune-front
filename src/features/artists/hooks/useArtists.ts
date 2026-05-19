import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { ArtistService, type SearchArtistsParams } from '../services/ArtistService'

export const useArtists = (params: SearchArtistsParams) => {
  return useQuery({
    queryKey: ['artists', params],
    queryFn: () => ArtistService.searchArtists(params),
    placeholderData: keepPreviousData,
  })
}
