import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from '../api/axiosInstance'
import { toast } from 'react-hot-toast'

function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState('patient')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  async function onSubmit(data) {
    try {
      const api = role === 'doctor' ? '/doctor-api/register' : '/patient-api/register'
      await axios.post(api, data)
      toast.success('Registration successful')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to register')
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex items-center justify-center bg-slate-950 px-6 py-16'
    >
      <div className='relative w-full max-w-3xl overflow-hidden rounded-[40px] bg-slate-900/90 p-10 shadow-2xl ring-1 ring-white/10'>
        <div className='mb-10 text-center'>
          <p className='text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold'>Create your account</p>
          <h1 className='mt-6 text-5xl font-black text-white'>Join MediCare+</h1>
          <p className='mt-4 text-slate-400'>Get secure access to patients, appointments, and clinical workflows.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6 md:grid-cols-2'>
          <label className='block'>
            <span className='text-slate-300'>Full Name</span>
            <input
              type='text'
              {...register('name', { required: 'Full name is required' })}
              className='mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-500'
            />
            {errors.name && <p className='mt-2 text-sm text-rose-400'>{errors.name.message}</p>}
          </label>

          <label className='block'>
            <span className='text-slate-300'>Email Address</span>
            <input
              type='email'
              {...register('email', { required: 'Email is required' })}
              className='mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-500'
            />
            {errors.email && <p className='mt-2 text-sm text-rose-400'>{errors.email.message}</p>}
          </label>

          <label className='block md:col-span-2'>
            <span className='text-slate-300'>Account Type</span>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className='mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-500'
            >
              <option value='patient'>Patient</option>
              <option value='doctor'>Doctor</option>
            </select>
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

          {role === 'doctor' && (
            <>
              <label className='block'>
                <span className='text-slate-300'>Specialization</span>
                <input
                  type='text'
                  {...register('specialization', { required: 'Specialization is required' })}
                  className='mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-500'
                />
                {errors.specialization && <p className='mt-2 text-sm text-rose-400'>{errors.specialization.message}</p>}
              </label>

              <label className='block'>
                <span className='text-slate-300'>Experience</span>
                <input
                  type='number'
                  {...register('experience', { required: 'Experience is required' })}
                  className='mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-500'
                />
                {errors.experience && <p className='mt-2 text-sm text-rose-400'>{errors.experience.message}</p>}
              </label>
            </>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='md:col-span-2 rounded-3xl bg-cyan-500 px-6 py-4 text-xl font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSubmitting ? 'Creating account…' : 'Register Now'}
          </button>
        </form>

        <p className='mt-8 text-center text-slate-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-cyan-300 hover:text-cyan-200'>
            Login
          </Link>
        </p>
      </div>
    </motion.section>
  )
}

export default Register