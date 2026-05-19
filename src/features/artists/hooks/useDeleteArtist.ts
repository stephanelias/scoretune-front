import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ArtistService } from '../services/ArtistService'

export const useDeleteArtist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ArtistService.deleteArtist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
    },
  })
}
