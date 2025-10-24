import { createBrowserRouter } from 'react-router'
import { lazy } from 'react'
import { AdminRequireLoader, authRequireLoader, redirectIfAuth } from './loaders/authLoader'
import MainLayout from '@/layouts/MainLayout'

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
    children: [
      { index: true, Component: HomePage },
      {
        loader: authRequireLoader,
        children: [
          {
            path: '/booking',
            Component: BookingPage,
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
    children: [
        { index: true, Component: AdminDashboard },
    ]
  }
])
