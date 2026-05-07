import { useEffect, useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaCalendarCheck, FaUsers, FaCheckCircle, FaClock } from 'react-icons/fa'
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

function StatCard({ icon: Icon, label, value, color, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial='hidden'
      animate='visible'
      className={`rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900 border-l-4 ${color}`}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-3xl font-black text-slate-900 dark:text-white'>{value}</p>
          <p className='mt-2 text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold'>{label}</p>
        </div>
        <Icon className='text-3xl text-slate-300 dark:text-slate-600' />
      </div>
    </motion.div>
  )
}

function DoctorDashboard() {
  const { user } = useContext(AuthContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?._id) return
    async function loadData() {
      try {
        setLoading(true)
        const res = await axiosInstance.get(`/appointment-api/doctor/${user._id}`)
        setAppointments(res.data.payload || [])
      } catch (err) {
        toast.error('Failed to load your appointments')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  async function handleStatusUpdate(id, newStatus) {
    try {
      await axiosInstance.put(`/appointment-api/update-status/${id}`, { status: newStatus })
      toast.success(`Marked as ${newStatus}`)
      setAppointments(prev =>
        prev.map(a => a._id === id ? { ...a, status: newStatus } : a)
      )
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  if (loading) return <Loader />

  const pending   = appointments.filter(a => a.status === 'Pending')
  const approved  = appointments.filter(a => a.status === 'Approved')
  const completed = appointments.filter(a => a.status === 'Completed')
  const today = new Date().toDateString()
  const todayAppts = appointments.filter(a => new Date(a.appointmentDate).toDateString() === today)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className='mb-8'>
        <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Doctor Portal</p>
        <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>
          Dr. {user?.name?.split(' ')[0] || 'Doctor'}'s Dashboard
        </h1>
        {user?.specialization && (
          <p className='mt-1 text-cyan-500 font-semibold'>{user.specialization}</p>
        )}
      </div>

      {/* Stats */}
      <div className='grid md:grid-cols-4 gap-5 mb-8'>
        <StatCard icon={FaCalendarCheck} label='Total'     value={appointments.length} color='border-cyan-500'    index={0} />
        <StatCard icon={FaClock}         label='Pending'   value={pending.length}      color='border-amber-500'  index={1} />
        <StatCard icon={FaCheckCircle}   label='Completed' value={completed.length}    color='border-emerald-500' index={2} />
        <StatCard icon={FaUsers}         label='Today'     value={todayAppts.length}   color='border-indigo-500' index={3} />
      </div>

      {/* Today's appointments */}
      {todayAppts.length > 0 && (
        <div className='rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-7 text-white shadow-xl mb-6'>
          <h2 className='text-xl font-bold mb-4'>📅 Today's Appointments ({todayAppts.length})</h2>
          <div className='space-y-3'>
            {todayAppts.map(a => (
              <div key={a._id} className='flex items-center justify-between rounded-2xl bg-white/15 px-4 py-3 backdrop-blur'>
                <div>
                  <p className='font-bold'>{a.patientId?.name || '—'}</p>
                  <p className='text-xs opacity-70'>
                    {new Date(a.appointmentDate).toLocaleTimeString('en-IN', { timeStyle: 'short' })}
                    {a.symptoms && ` · ${a.symptoms.slice(0, 30)}...`}
                  </p>
                </div>
                <select
                  value={a.status}
                  onChange={e => handleStatusUpdate(a._id, e.target.value)}
                  className='rounded-xl bg-white/20 border border-white/30 px-3 py-1.5 text-xs font-bold text-white outline-none cursor-pointer'
                >
                  {['Pending', 'Approved', 'Completed', 'Cancelled'].map(s => (
                    <option key={s} value={s} className='text-slate-900'>{s}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All appointments */}
      <div className='rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900'>
        <h2 className='text-xl font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2'>
          <FaCalendarCheck className='text-cyan-500' /> All Patient Appointments
        </h2>
        {appointments.length === 0 ? (
          <EmptyState
            icon={FaCalendarCheck}
            title='No appointments yet'
            message='Your patient appointments will appear here once booked.'
          />
        ) : (
          <div className='space-y-3 max-h-96 overflow-y-auto pr-1'>
            {appointments.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className='flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-800 gap-3'
              >
                <div className='flex-1'>
                  <p className='font-semibold text-slate-800 dark:text-slate-200'>
                    {a.patientId?.name || '—'}
                  </p>
                  <p className='text-xs text-slate-500 mt-0.5'>
                    {new Date(a.appointmentDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                  {a.symptoms && (
                    <p className='text-xs text-slate-400 mt-0.5 truncate max-w-[200px]'>{a.symptoms}</p>
                  )}
                </div>
                <select
                  value={a.status}
                  onChange={e => handleStatusUpdate(a._id, e.target.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold border-none outline-none cursor-pointer ${STATUS_BADGE[a.status]}`}
                >
                  {['Pending', 'Approved', 'Completed', 'Cancelled'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default DoctorDashboard