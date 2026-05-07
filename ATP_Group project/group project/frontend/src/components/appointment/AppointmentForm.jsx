import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaCalendarAlt, FaUserMd, FaSearch } from 'react-icons/fa'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../common/Loader'

function AppointmentForm() {
  const { user, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [loadingDoctors, setLoadingDoctors] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await axiosInstance.get('/doctor-api/doctors')
        setDoctors(res.data.payload || [])
      } catch (err) {
        console.error('Failed to load doctors for form')
      } finally {
        setLoadingDoctors(false)
      }
    }
    fetchDoctors()
  }, [])

  async function onSubmit(data) {
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment')
      navigate('/login')
      return
    }
    try {
      await axiosInstance.post('/appointment-api/book', {
        patientId: user._id,
        doctorId: data.doctorId,
        appointmentDate: data.appointmentDate,
        symptoms: data.symptoms
      })
      toast.success('Appointment booked successfully! You will receive a confirmation email.')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book appointment')
    }
  }

  return (
    <section className='py-24 bg-slate-50 dark:bg-slate-950'>
      <div className='max-w-3xl mx-auto px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className='text-center mb-12'>
            <p className='text-cyan-500 uppercase tracking-[0.3em] text-sm font-bold'>Quick Booking</p>
            <h2 className='mt-4 text-5xl font-black text-slate-900 dark:text-white'>Book an Appointment</h2>
            <p className='mt-4 text-slate-500 dark:text-slate-400'>
              Select your doctor and preferred date. We'll send a confirmation to your email.
            </p>
          </div>

          <div className='rounded-[40px] bg-white p-10 shadow-2xl dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800'>
            {loadingDoctors ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Doctor Select */}
                <label className='block'>
                  <span className='flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold mb-2'>
                    <FaUserMd className='text-cyan-500' /> Choose Doctor
                  </span>
                  <select
                    {...register('doctorId', { required: 'Please select a doctor' })}
                    className='w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                  >
                    <option value=''>Select a doctor...</option>
                    {doctors.map(doc => (
                      <option key={doc._id} value={doc._id}>
                        Dr. {doc.name} — {doc.specialization}
                        {doc.consultationFee > 0 ? ` (₹${doc.consultationFee})` : ''}
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && (
                    <p className='mt-2 text-sm text-rose-400'>{errors.doctorId.message}</p>
                  )}
                </label>

                {/* Date + Time */}
                <label className='block'>
                  <span className='flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold mb-2'>
                    <FaCalendarAlt className='text-cyan-500' /> Appointment Date & Time
                  </span>
                  <input
                    type='datetime-local'
                    {...register('appointmentDate', { required: 'Please select a date and time' })}
                    min={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)}
                    className='w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                  />
                  {errors.appointmentDate && (
                    <p className='mt-2 text-sm text-rose-400'>{errors.appointmentDate.message}</p>
                  )}
                </label>

                {/* Symptoms */}
                <label className='block'>
                  <span className='text-slate-600 dark:text-slate-300 font-semibold mb-2 block'>
                    Symptoms / Reason for Visit
                  </span>
                  <textarea
                    {...register('symptoms', { required: 'Please describe your symptoms' })}
                    rows={4}
                    placeholder='Describe your symptoms or reason for this appointment...'
                    className='w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-none focus:border-cyan-500 transition resize-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                  />
                  {errors.symptoms && (
                    <p className='mt-2 text-sm text-rose-400'>{errors.symptoms.message}</p>
                  )}
                </label>

                {!isAuthenticated && (
                  <div className='rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4 text-amber-700 text-sm dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300'>
                    You must be logged in as a patient to book an appointment.{' '}
                    <button type='button' onClick={() => navigate('/login')} className='underline font-semibold'>
                      Login here
                    </button>
                  </div>
                )}

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-2xl bg-cyan-500 py-5 text-xl font-bold text-white shadow-lg transition hover:bg-cyan-600 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AppointmentForm