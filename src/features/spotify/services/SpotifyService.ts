import { api } from '../../../lib/axios'
import type { SpotifyArtistPhotoDto } from '../models/SpotifyArtistPhotoDto'
import type { SpotifyProjectCoverDto } from '../models/SpotifyProjectCoverDto'

export class SpotifyService {
  static async getArtistPhoto(name: string): Promise<string> {
    const response = await api.get<SpotifyArtistPhotoDto>('/spotify/artist/photo', {
      params: { name },
    })
    return response.data.photoUrl
  }

  static async getProjectCover(name: string, artists: string[]): Promise<string> {
    const response = await api.get<SpotifyProjectCoverDto>('/spotify/project/cover', {
      params: { name, artists },
      paramsSerializer: params => {
        const searchParams = new URLSearchParams()
        searchParams.append('name', params.name)

        if (Array.isArray(params.artists)) {
          for (const artist of params.artists) {
            if (artist) {
              searchParams.append('artists', artist)
            }
          }
        }

        return searchParams.toString()
      },
    })
    return response.data.coverUrl
  }
}
