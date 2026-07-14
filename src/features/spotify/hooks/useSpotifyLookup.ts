import { useMutation } from '@tanstack/react-query'

import { SpotifyService } from '../services/SpotifyService'

export function useSpotifyArtistPhoto() {
  return useMutation({
    mutationFn: (name: string) => SpotifyService.getArtistPhoto(name),
  })
}

export function useSpotifyProjectCover() {
  return useMutation({
    mutationFn: ({ name, artists }: { name: string; artists: string[] }) =>
      SpotifyService.getProjectCover(name, artists),
  })
}
