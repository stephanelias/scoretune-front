import { api } from '../../../lib/axios'
import type { ArtistDto, CreateArtistDto, UpdateArtistDto } from '../models/ArtistDto'

export class ArtistService {
  private static readonly BASE_URL = '/artists'

  static async getAllArtists(): Promise<ArtistDto[]> {
    const response = await api.get<ArtistDto[]>(this.BASE_URL)
    return response.data
  }

  static async getArtistById(id: string): Promise<ArtistDto> {
    const response = await api.get<ArtistDto>(`${this.BASE_URL}/${id}`)
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
