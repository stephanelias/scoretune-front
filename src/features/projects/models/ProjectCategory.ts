export const ProjectCategory = {
  HIP_HOP_RAP: 'HIP_HOP_RAP',
  RNB_SOUL: 'RNB_SOUL',
  ROCK: 'ROCK',
  POP: 'POP',
  COUNTRY: 'COUNTRY',
  ELECTRONIC_DANCE: 'ELECTRONIC_DANCE',
} as const

export type ProjectCategory = (typeof ProjectCategory)[keyof typeof ProjectCategory]

export const ProjectCategoryLabels: Record<ProjectCategory, string> = {
  [ProjectCategory.HIP_HOP_RAP]: 'Hip-hop / Rap',
  [ProjectCategory.RNB_SOUL]: 'R&B / Soul',
  [ProjectCategory.ROCK]: 'Rock',
  [ProjectCategory.POP]: 'Pop',
  [ProjectCategory.COUNTRY]: 'Country',
  [ProjectCategory.ELECTRONIC_DANCE]: 'Electronic / Dance',
}
