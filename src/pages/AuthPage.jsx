import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { errorMessage } from '../api/client'
import { ErrorBox } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) await register(form)
      else await login({ email: form.email, password: form.password })
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-xl font-bold">{isRegister ? 'Create account' : 'Welcome back'}</h1>
      <form onSubmit={submit} className="space-y-3">
        {isRegister && (
          <input className="input" placeholder="Name" value={form.name} onChange={set('name')} required />
        )}
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={set('password')} required minLength={6} />
        <ErrorBox message={error} />
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? 'Please wait…' : isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        {isRegister ? 'Already have an account?' : 'New here?'}{' '}
        <Link to={isRegister ? '/login' : '/register'} className="text-brand-600 hover:underline">
          {isRegister ? 'Login' : 'Create an account'}
        </Link>
      </p>
    </div>
  )
}
