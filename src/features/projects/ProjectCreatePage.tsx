import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import AppLayout from '../../components/ui/AppLayout'
import { useAuth } from '../../core/contexts/AuthContext'
import { getApiErrorMessage } from '../../core/utils/getApiErrorMessage'

import { ProjectFormStepper } from './components/ProjectFormStepper'
import { useCreateProject } from './hooks/useCreateProject'
import { createInitialDraft } from './models/ProjectDraft'
import { draftToRequest } from './utils/projectForm'

export function ProjectCreatePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const createProject = useCreateProject()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const canEdit =
    (user?.roles?.includes('ROLE_ADMIN') || user?.roles?.includes('ROLE_MODO')) ?? false

  if (!canEdit) {
    return <Navigate to="/projects" replace />
  }

  return (
    <AppLayout title="Nouveau projet" maxWidth="4xl">
      <ProjectFormStepper
        backLink={{ to: '/projects', label: '← Retour aux projets' }}
        initialDraft={createInitialDraft()}
        submitLabel="Créer le projet"
        submittingLabel="Création…"
        isSubmitting={createProject.isPending}
        submitError={submitError}
        onSubmit={async draft => {
          setSubmitError(null)
          try {
            const created = await createProject.mutateAsync(draftToRequest(draft))
            navigate(`/projects/${created.id}`)
          } catch (error) {
            setSubmitError(getApiErrorMessage(error, 'Impossible de créer le projet.'))
          }
        }}
      />
    </AppLayout>
  )
}
