import { useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from '../api/axiosInstance'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useContext(AuthContext)
  const from = location.state?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  async function onSubmit(data) {
    try {
      const res = await axios.post('/auth/login', data)
      login(res.data)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to login')
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex items-center justify-center bg-slate-950 px-6 py-16'
    >
      <div className='relative w-full max-w-xl overflow-hidden rounded-[40px] bg-slate-900/90 p-10 shadow-2xl ring-1 ring-white/10'>
        <div className='mb-10 text-center'>
          <p className='text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold'>Secure Access</p>
          <h1 className='mt-6 text-5xl font-black text-white'>Welcome Back</h1>
          <p className='mt-4 text-slate-400'>Login to access your hospital dashboard and manage appointments.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <label className='block'>
            <span className='text-slate-300'>Email Address</span>
            <input
              type='email'
              {...register('email', { required: 'Email is required' })}
              className='mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-500'
            />
            {errors.email && <p className='mt-2 text-sm text-rose-400'>{errors.email.message}</p>}
          </label>

          <label className='block'>
            <span className='text-slate-300'>Password</span>
            <input
              type='password'
              {...register('password', { required: 'Password is required' })}
              className='mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-500'
            />
            {errors.password && <p className='mt-2 text-sm text-rose-400'>{errors.password.message}</p>}
          </label>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-3xl bg-cyan-500 px-6 py-4 text-xl font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className='mt-8 text-center text-slate-400'>
          Don&apos;t have an account?{' '}
          <Link className='text-cyan-300 hover:text-cyan-200' to='/register'>
            Register
          </Link>
        </p>
      </div>
    </motion.section>
  )
}

export default Login
