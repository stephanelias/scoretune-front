import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { ProjectService, type SearchProjectsParams } from '../services/ProjectService'

export const useProjects = (params: SearchProjectsParams) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => ProjectService.searchProjects(params),
    placeholderData: keepPreviousData,
  })
}
