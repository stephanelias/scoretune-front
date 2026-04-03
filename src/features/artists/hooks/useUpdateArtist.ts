import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { UpdateArtistDto } from '../models/ArtistDto'
import { ArtistService } from '../services/ArtistService'

export const useUpdateArtist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, artist }: { id: string; artist: UpdateArtistDto }) =>
      ArtistService.updateArtist(id, artist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
    },
  })
}
