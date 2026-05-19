import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateArtistDto } from '../models/ArtistDto'
import { ArtistService } from '../services/ArtistService'

export const useCreateArtist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (artist: CreateArtistDto) => ArtistService.createArtist(artist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
    },
  })
}
