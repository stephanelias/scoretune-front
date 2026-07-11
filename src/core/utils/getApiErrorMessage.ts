const ARTIST_NAME_ALREADY_EXISTS_CODE = 'artist.name-already-exists'
const PROJECT_ALREADY_EXISTS_CODE = 'project.already-exists'
const INVALID_TOKEN_CODE = 'auth.invalid-token'
const SPOTIFY_ARTIST_NOT_FOUND_CODE = 'spotify.artist-not-found'
const SPOTIFY_PROJECT_NOT_FOUND_CODE = 'spotify.project-not-found'
const SPOTIFY_NOT_CONFIGURED_CODE = 'spotify.not-configured'
const SPOTIFY_API_ERROR_CODE = 'spotify.api-error'
const SPOTIFY_NAME_REQUIRED_CODE = 'spotify.name-required'

interface ApiErrorBody {
  message?: string
  code?: string
}

interface ApiErrorLike {
  response?: {
    status?: number
    data?: ApiErrorBody
  }
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const apiError = error as ApiErrorLike
  const data = apiError.response?.data

  if (data?.code === ARTIST_NAME_ALREADY_EXISTS_CODE) {
    return data.message ?? 'Un artiste avec ce nom existe déjà'
  }

  if (data?.code === PROJECT_ALREADY_EXISTS_CODE) {
    return data.message ?? 'Un projet avec ce nom et cette date existe déjà'
  }

  if (data?.code === INVALID_TOKEN_CODE) {
    return data.message ?? 'Session expirée, veuillez vous reconnecter'
  }

  if (data?.code === SPOTIFY_ARTIST_NOT_FOUND_CODE) {
    return data.message ?? 'Aucun artiste trouvé sur Spotify'
  }

  if (data?.code === SPOTIFY_PROJECT_NOT_FOUND_CODE) {
    return data.message ?? 'Aucun album trouvé sur Spotify'
  }

  if (data?.code === SPOTIFY_NOT_CONFIGURED_CODE) {
    return data.message ?? "L'intégration Spotify n'est pas configurée"
  }

  if (data?.code === SPOTIFY_API_ERROR_CODE) {
    return data.message ?? 'Spotify est indisponible pour le moment'
  }

  if (data?.code === SPOTIFY_NAME_REQUIRED_CODE) {
    return data.message ?? 'Le nom est requis pour la recherche Spotify'
  }

  if (data?.message) {
    return data.message
  }

  if (apiError.response?.status === 401) {
    return 'Session expirée, veuillez vous reconnecter'
  }

  if (apiError.response?.status === 403) {
    return "Vous n'avez pas les droits nécessaires pour effectuer cette action"
  }

  if (apiError.response?.status === 409) {
    return fallback
  }

  return fallback
}
