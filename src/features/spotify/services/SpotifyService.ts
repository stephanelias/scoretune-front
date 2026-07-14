import type { CustomParamsSerializer } from 'axios'

import { api } from '../../../lib/axios'
import type { SpotifyArtistPhotoDto } from '../models/SpotifyArtistPhotoDto'
import type { SpotifyProjectCoverDto } from '../models/SpotifyProjectCoverDto'
import type { SpotifyProjectTracklistDto } from '../models/SpotifyProjectTracklistDto'

const serializeNameAndArtistsParams: CustomParamsSerializer = params => {
  const searchParams = new URLSearchParams()

  if (typeof params.name === 'string') {
    searchParams.append('name', params.name)
  }

  if (Array.isArray(params.artists)) {
    for (const artist of params.artists) {
      if (typeof artist === 'string' && artist) {
        searchParams.append('artists', artist)
      }
    }
  }

  return searchParams.toString()
}

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
      paramsSerializer: serializeNameAndArtistsParams,
    })
    return response.data.coverUrl
  }

  static async getProjectTracklist(name: string, artists: string[]): Promise<SpotifyProjectTracklistDto> {
    const response = await api.get<SpotifyProjectTracklistDto>('/spotify/project/tracklist', {
      params: { name, artists },
      paramsSerializer: serializeNameAndArtistsParams,
    })
    return response.data
  }
}
