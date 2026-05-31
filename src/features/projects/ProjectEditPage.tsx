import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import AppLayout from '../../components/ui/AppLayout'
import { useAuth } from '../../core/contexts/AuthContext'
import { getApiErrorMessage } from '../../core/utils/getApiErrorMessage'

import { ProjectFormStepper } from './components/ProjectFormStepper'
import { useProject } from './hooks/useProject'
import { useUpdateProject } from './hooks/useUpdateProject'
import { draftToRequest, projectDtoToDraft } from './utils/projectForm'

export function ProjectEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: project, isLoading, isError } = useProject(id!)
  const updateProject = useUpdateProject()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const canEdit =
    (user?.roles?.includes('ROLE_ADMIN') || user?.roles?.includes('ROLE_MODO')) ?? false

  if (!canEdit) {
    return <Navigate to="/projects" replace />
  }

  if (isLoading) {
    return (
      <AppLayout title="Modifier le projet" maxWidth="4xl">
        <div className="flex justify-center items-center py-12">
          <span
            className="animate-spin inline-block size-8 border-4 border-current border-t-transparent text-gray-800 rounded-full"
            role="status"
            aria-label="loading"
          />
        </div>
      </AppLayout>
    )
  }

  if (isError || !project) {
    return (
      <AppLayout title="Modifier le projet" maxWidth="4xl">
        <p className="text-sm text-red-600">Projet introuvable.</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout title={`Modifier ${project.name}`} maxWidth="4xl">
      <ProjectFormStepper
        key={project.id}
        backLink={{ to: `/projects/${project.id}`, label: '← Retour au projet' }}
        initialDraft={projectDtoToDraft(project)}
        submitLabel="Enregistrer"
        submittingLabel="Enregistrement…"
        isSubmitting={updateProject.isPending}
        submitError={submitError}
        onSubmit={async draft => {
          setSubmitError(null)
          try {
            await updateProject.mutateAsync({ id: project.id, project: draftToRequest(draft) })
            navigate(`/projects/${project.id}`)
          } catch (error) {
            setSubmitError(getApiErrorMessage(error, 'Impossible de modifier le projet.'))
          }
        }}
      />
    </AppLayout>
  )
}
