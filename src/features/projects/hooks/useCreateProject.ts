import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ProjectRequestDto } from '../models/ProjectRequestDto'
import { ProjectService } from '../services/ProjectService'

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (project: ProjectRequestDto) => ProjectService.createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
