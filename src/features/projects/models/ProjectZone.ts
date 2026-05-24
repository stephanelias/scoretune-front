export const ProjectZone = {
  FR: 'FR',
  UK: 'UK',
  US: 'US',
} as const

export type ProjectZone = (typeof ProjectZone)[keyof typeof ProjectZone]

export const ProjectZoneLabels: Record<ProjectZone, string> = {
  [ProjectZone.FR]: 'France',
  [ProjectZone.UK]: 'Royaume-Uni',
  [ProjectZone.US]: 'États-Unis',
}
