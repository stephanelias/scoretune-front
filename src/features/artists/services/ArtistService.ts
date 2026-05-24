import { api } from '../../../lib/axios'
import type { PageResponse } from '../../../core/models/PageResponse'
import type { ProjectType } from '../../projects/models/ProjectType'
import type { ProjectSummaryDto } from '../../projects/models/ProjectSummaryDto'
import type { ArtistDto, CreateArtistDto, UpdateArtistDto } from '../models/ArtistDto'

export interface SearchArtistsParams {
  page: number
  size: number
  search?: string
}

export interface ArtistProjectsParams {
  artistId: string
  type: ProjectType
  page: number
  size: number
}

export interface ArtistAppearancesParams {
  artistId: string
  page: number
  size: number
}

export class ArtistService {
  private static readonly BASE_URL = '/artists'

  static async searchArtists(params: SearchArtistsParams): Promise<PageResponse<ArtistDto>> {
    const response = await api.get<PageResponse<ArtistDto>>(this.BASE_URL, {
      params: {
        page: params.page,
        size: params.size,
        ...(params.search ? { search: params.search } : {}),
      },
    })
    return response.data
  }

  static async getArtistById(id: string): Promise<ArtistDto> {
    const response = await api.get<ArtistDto>(`${this.BASE_URL}/${id}`)
    return response.data
  }

  static async getArtistProjects(params: ArtistProjectsParams): Promise<PageResponse<ProjectSummaryDto>> {
    const response = await api.get<PageResponse<ProjectSummaryDto>>(
      `${this.BASE_URL}/${params.artistId}/projects`,
      {
        params: {
          type: params.type,
          page: params.page,
          size: params.size,
        },
      }
    )
    return response.data
  }

  static async getArtistAppearances(
    params: ArtistAppearancesParams
  ): Promise<PageResponse<ProjectSummaryDto>> {
    const response = await api.get<PageResponse<ProjectSummaryDto>>(
      `${this.BASE_URL}/${params.artistId}/appearances`,
      {
        params: {
          page: params.page,
          size: params.size,
        },
      }
    )
    return response.data
  }

  static async createArtist(artist: CreateArtistDto): Promise<ArtistDto> {
    const response = await api.post<ArtistDto>(this.BASE_URL, artist)
    return response.data
  }

  static async updateArtist(id: string, artist: UpdateArtistDto): Promise<ArtistDto> {
    const response = await api.put<ArtistDto>(`${this.BASE_URL}/${id}`, artist)
    return response.data
  }

  static async deleteArtist(id: string): Promise<void> {
    await api.delete(`${this.BASE_URL}/${id}`)
  }
}
