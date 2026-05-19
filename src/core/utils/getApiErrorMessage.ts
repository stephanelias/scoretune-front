const ARTIST_NAME_ALREADY_EXISTS_CODE = 'artist.name-already-exists'

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

  if (data?.message) {
    return data.message
  }

  if (apiError.response?.status === 409) {
    return 'Un artiste avec ce nom existe déjà'
  }

  return fallback
}
