import { Route, Routes } from 'react-router-dom'

import ArtistsPage from '../features/artists/ArtistsPage'
import { ArtistDetailPage } from '../features/artists/ArtistDetailPage'
import { ProjectDetailPage } from '../features/projects/ProjectDetailPage'
import ProjectsPage from '../features/projects/ProjectsPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import HomePage from '../features/home/HomePage'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/artists" element={<ArtistsPage />} />
    <Route path="/artists/:id" element={<ArtistDetailPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/projects/:id" element={<ProjectDetailPage />} />
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/register" element={<RegisterPage />} />
  </Routes>
)
