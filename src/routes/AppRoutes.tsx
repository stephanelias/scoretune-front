import { Route, Routes } from 'react-router-dom'

import { ArtistDetailPage } from '../features/artists/ArtistDetailPage'
import ArtistsPage from '../features/artists/ArtistsPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import HomePage from '../features/home/HomePage'
import { ProjectCreatePage } from '../features/projects/ProjectCreatePage'
import { ProjectDetailPage } from '../features/projects/ProjectDetailPage'
import { ProjectEditPage } from '../features/projects/ProjectEditPage'
import ProjectsPage from '../features/projects/ProjectsPage'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/artists" element={<ArtistsPage />} />
    <Route path="/artists/:id" element={<ArtistDetailPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/projects/new" element={<ProjectCreatePage />} />
    <Route path="/projects/:id/edit" element={<ProjectEditPage />} />
    <Route path="/projects/:id" element={<ProjectDetailPage />} />
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/register" element={<RegisterPage />} />
  </Routes>
)
