import { AuthAPI } from '@/api/auth.api'
import Input from '@/components/ui/Input'
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'

export default function LoginPage() {
  const [params] = useSearchParams();
  const [email, setEmail] = useState('test1@gmail.com')
  const [password, setPassword] = useState('123456')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = (setFunc: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setFunc(value)
    setErrorMsg('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await AuthAPI.login(email, password).then(() => {
      const redirect = params.get("redirect") || "/";

      navigate(redirect, { replace: true })
    }).catch((err) => {
      if (err.status === 401) {
        setErrorMsg("Invalid credentionals")
      } else {
        setErrorMsg("Something went wrong")
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgDark text-text-primary">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-primary">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleChange(setEmail, e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-textSecondary mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => handleChange(setPassword, e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary text-white py-2 rounded-lg font-medium hover:text-white hover:bg-red-700 transition-colors"
          >
            Login
          </button>
          <p className="text-primary text-center">{errorMsg}</p>
        </form>

        <p className="text-center text-sm text-textSecondary mt-6">
          Don't have account?{' '}
          <Link to={`/auth/register?redirect=${params.get("redirect") || "/"}`} className="text-accent hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
