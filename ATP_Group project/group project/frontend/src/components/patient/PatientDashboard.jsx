import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaCalendarCheck, FaPrescriptionBottleAlt, FaUserMd } from 'react-icons/fa'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../common/Loader'
import EmptyState from '../common/EmptyState'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
}

const STATUS_BADGE = {
  Pending:   'bg-amber-100 text-amber-700',
  Approved:  'bg-emerald-100 text-emerald-700',
  Completed: 'bg-cyan-100 text-cyan-700',
  Cancelled: 'bg-rose-100 text-rose-700',
}

function StatCard({ label, value, color, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial='hidden'
      animate='visible'
      className={`rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900 border-l-4 ${color}`}
    >
      <p className='text-3xl font-black text-slate-900 dark:text-white'>{value}</p>
      <p className='mt-2 text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold'>{label}</p>
    </motion.div>
  )
}

function PatientDashboard() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?._id) return
    async function loadData() {
      try {
        setLoading(true)
        const [apptRes, rxRes] = await Promise.all([
          axiosInstance.get(`/appointment-api/patient/${user._id}`),
          axiosInstance.get(`/prescription-api/patient/${user._id}`)
        ])
        setAppointments(apptRes.data.payload || [])
        setPrescriptions(rxRes.data.payload || [])
      } catch (err) {
        toast.error('Failed to load your dashboard data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  if (loading) return <Loader />

  const upcoming = appointments.filter(a => a.status === 'Approved' || a.status === 'Pending')
  const completed = appointments.filter(a => a.status === 'Completed')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className='mb-8'>
        <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Welcome back</p>
        <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>
          Hello, {user?.name?.split(' ')[0] || 'Patient'} 👋
        </h1>
      </div>

      {/* Stats */}
      <div className='grid md:grid-cols-3 gap-5 mb-8'>
        <StatCard label='Total Appointments' value={appointments.length} color='border-cyan-500'    index={0} />
        <StatCard label='Upcoming'            value={upcoming.length}      color='border-amber-500'  index={1} />
        <StatCard label='Prescriptions'       value={prescriptions.length} color='border-indigo-500' index={2} />
      </div>

      {/* Book CTA */}
      <div className='rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-8 text-white shadow-xl mb-8'>
        <h2 className='text-2xl font-bold'>Need to see a doctor?</h2>
        <p className='mt-2 opacity-80'>Book an appointment with our specialist doctors in minutes.</p>
        <button
          onClick={() => navigate('/')}
          className='mt-5 rounded-2xl bg-white px-6 py-3 font-bold text-cyan-600 hover:bg-slate-100 transition shadow'
        >
          Book Appointment →
        </button>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        {/* Upcoming appointments */}
        <div className='rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900'>
          <h2 className='text-xl font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2'>
            <FaCalendarCheck className='text-cyan-500' /> Upcoming Appointments
          </h2>
          {upcoming.length === 0 ? (
            <EmptyState icon={FaCalendarCheck} title='No upcoming appointments' />
          ) : (
            <div className='space-y-3'>
              {upcoming.map(a => (
                <div key={a._id} className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800'>
                  <div>
                    <p className='font-semibold text-slate-800 dark:text-slate-200'>
                      Dr. {a.doctorId?.name || '—'}
                    </p>
                    <p className='text-xs text-slate-500 mt-0.5'>
                      {new Date(a.appointmentDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    {a.symptoms && <p className='text-xs text-slate-400 mt-0.5 truncate max-w-[180px]'>{a.symptoms}</p>}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_BADGE[a.status]}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent prescriptions */}
        <div className='rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900'>
          <h2 className='text-xl font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2'>
            <FaPrescriptionBottleAlt className='text-cyan-500' /> Recent Prescriptions
          </h2>
          {prescriptions.length === 0 ? (
            <EmptyState icon={FaPrescriptionBottleAlt} title='No prescriptions yet' />
          ) : (
            <div className='space-y-3'>
              {prescriptions.slice(0, 5).map(rx => (
                <div key={rx._id} className='rounded-2xl bg-slate-50 p-4 dark:bg-slate-800'>
                  <p className='font-semibold text-slate-800 dark:text-slate-200 text-sm'>
                    Dr. {rx.doctorId?.name || '—'}
                  </p>
                  <p className='text-xs text-slate-400 mt-0.5'>
                    {new Date(rx.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                  </p>
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {rx.medicines?.slice(0, 3).map((m, j) => (
                      <span key={j} className='rounded-xl bg-cyan-50 px-2 py-0.5 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'>
                        {m.medicineName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PatientDashboard