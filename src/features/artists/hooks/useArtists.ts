import { useQuery } from '@tanstack/react-query'

import { ArtistService } from '../services/ArtistService'

export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: () => ArtistService.getAllArtists(),
  })
}
