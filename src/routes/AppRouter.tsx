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

const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const BookingPage = lazy(() => import('@/pages/BookingPage'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
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
    children: [{ index: true, Component: AdminDashboard }],
  },
])
