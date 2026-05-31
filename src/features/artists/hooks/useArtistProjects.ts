import { useQuery } from '@tanstack/react-query'

import type { ProjectType } from '../../projects/models/ProjectType'
import { ArtistService } from '../services/ArtistService'

export const useArtistProjects = (artistId: string, type: ProjectType) => {
  return useQuery({
    queryKey: ['artist-projects', artistId, type],
    queryFn: () =>
      ArtistService.getArtistProjects({
        artistId,
        type,
        page: 0,
        size: 24,
      }),
    enabled: Boolean(artistId),
  })
}
