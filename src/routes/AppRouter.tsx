import { createBrowserRouter } from 'react-router'
import { lazy } from 'react'
import {
  AdminRequireLoader,
  authRequireLoader,
  getUserLoader,
  redirectIfAuth,
} from './loaders/authLoader'
import MainLayout from '@/layouts/MainLayout'
import FilmDetails from '@/pages/FilmDetails'
import TiketsPage from '@/pages/TiketsPage'
import Schedule from '@/pages/Schedule'
import AdminLayout from '@/layouts/AdminLayout'
import AdminFilmPage from '@/pages/admin/AdminFilmPage'
import AdminFilmDetails from '@/pages/admin/AdminFilmDetails'
import AdminFilmCreate from '@/pages/admin/AdminFilmCreate'

const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const BookingPage = lazy(() => import('@/pages/BookingPage'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    loader: getUserLoader,
    children: [
      { index: true, Component: HomePage },
      {
        path: '/film/:id',
        Component: FilmDetails,
      },
      {
        path: '/schedule',
        Component: Schedule,
      },
      {
        loader: authRequireLoader,
        children: [
          {
            path: '/booking/:id',
            Component: BookingPage,
          },
          {
            path: '/tickets',
            Component: TiketsPage,
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: 'auth',
    loader: redirectIfAuth,
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
    ],
  },
  {
    path: 'admin',
    loader: AdminRequireLoader,
    element: <AdminLayout />,
    children: [
      { index: true, Component: AdminDashboard },
      {
        path: 'films',
        children: [
          { index: true, Component: AdminFilmPage },
          { path: ':id/edit', Component: AdminFilmDetails },
          { path: 'new', Component: AdminFilmCreate },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
