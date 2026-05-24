export const ProjectType = {
  SINGLE: 'SINGLE',
  EP: 'EP',
  ALBUM: 'ALBUM',
} as const

export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType]

export const ProjectTypeLabels: Record<ProjectType, string> = {
  [ProjectType.SINGLE]: 'Single',
  [ProjectType.EP]: 'EP',
  [ProjectType.ALBUM]: 'Album',
}

export const ProjectTypeBadgeColors: Record<ProjectType, string> = {
  [ProjectType.SINGLE]: 'bg-emerald-100 text-emerald-800',
  [ProjectType.EP]: 'bg-violet-100 text-violet-800',
  [ProjectType.ALBUM]: 'bg-amber-100 text-amber-800',
}
