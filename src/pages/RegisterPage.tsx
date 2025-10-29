import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import { Link, useNavigate } from 'react-router'
import { AuthAPI } from '@/api/auth.api'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = (setFunc: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setFunc(value);
    setErrorMsg("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      setErrorMsg("Passwords didn't match")
      return
    }

    if (password.length < 6) {
      setErrorMsg("Password need to have at least 6 characters")
      return
    }

    AuthAPI.register(email, username, password).then(() => {
      navigate('/')
    }).catch((err) => {
      if (err.status === 409) {
        setErrorMsg("Email is already in use")
      } else {
        setErrorMsg("Something went wrong")
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgDark text-text-primary">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-primary">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-1">
              Email
            </label>
            <Input type="email" value={email} onChange={(e) => handleChange(setEmail, e.target.value)} required />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-textSecondary mb-1">
              Username
            </label>
            <Input
              type="username"
              value={username}
              onChange={(e) => handleChange(setUsername, e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-textSecondary mb-1">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => handleChange(setPassword, e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="repeat-password"
              className="block text-sm font-medium text-textSecondary mb-1"
            >
              Repeat Password
            </label>
            <Input
              type="password"
              value={repeatPassword}
              onChange={(e) => handleChange(setRepeatPassword, e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary text-white py-2 rounded-lg font-medium hover:text-white hover:bg-red-700 transition-colors"
          >
            Register
          </button>
          <p className="text-primary text-center">{errorMsg}</p>
        </form>

        <p className="text-center text-sm text-textSecondary mt-6">
          Already have account?{' '}
          <Link to="/auth/login" className="text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
