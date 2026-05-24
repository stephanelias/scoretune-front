import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ProjectRequestDto } from '../models/ProjectRequestDto'
import { ProjectService } from '../services/ProjectService'

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: ProjectRequestDto }) =>
      ProjectService.updateProject(id, project),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] })
    },
  })
}
