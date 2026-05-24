import { api } from '../../../lib/axios'
import type { PageResponse } from '../../../core/models/PageResponse'
import type { ProjectDto } from '../models/ProjectDto'
import type { ProjectSummaryDto } from '../models/ProjectSummaryDto'

export interface SearchProjectsParams {
  page: number
  size: number
  search?: string
}

export class ProjectService {
  private static readonly BASE_URL = '/projects'

  static async searchProjects(params: SearchProjectsParams): Promise<PageResponse<ProjectSummaryDto>> {
    const response = await api.get<PageResponse<ProjectSummaryDto>>(this.BASE_URL, {
      params: {
        page: params.page,
        size: params.size,
        ...(params.search ? { search: params.search } : {}),
      },
    })
    return response.data
  }

  static async getProjectById(id: string): Promise<ProjectDto> {
    const response = await api.get<ProjectDto>(`${this.BASE_URL}/${id}`)
    return response.data
  }
}
