import { RouterProvider } from 'react-router/dom'
import { router } from './routes/AppRouter'
import { ToastContainer } from 'react-toastify';

import './App.css'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className='bg-bg-dark'>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </div>
  )
}

export default App
