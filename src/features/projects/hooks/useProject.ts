import { useQuery } from '@tanstack/react-query'

import { ProjectService } from '../services/ProjectService'

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => ProjectService.getProjectById(id),
    enabled: !!id,
  })
}
