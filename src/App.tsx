import { RouterProvider } from 'react-router/dom'
import { router } from './routes/AppRouter'

import './App.css'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className='bg-bg-dark'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App
