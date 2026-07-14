import { useQuery } from '@tanstack/react-query';

import { ArtistService } from '../services/ArtistService';

export const useArtist = (id: string) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => ArtistService.getArtistById(id),
    enabled: !!id,
  });
};
