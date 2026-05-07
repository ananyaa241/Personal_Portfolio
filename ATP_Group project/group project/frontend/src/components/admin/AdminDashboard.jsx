import { useEffect, useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FaUserMd, FaUsers, FaCalendarCheck, FaPrescriptionBottleAlt, FaSearch } from 'react-icons/fa'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../common/Loader'
import EmptyState from '../common/EmptyState'

const PIE_COLORS = ['#06b6d4', '#6366f1', '#f59e0b', '#10b981', '#f43f5e']

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
}

function StatCard({ icon: Icon, label, value, color, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial='hidden'
      animate='visible'
      className={`rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900 border-l-4 ${color}`}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold'>{label}</p>
          <p className='mt-3 text-5xl font-black text-slate-900 dark:text-white'>{value}</p>
        </div>
        <div className={`rounded-2xl p-4 text-2xl opacity-80 ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-30`}>
          <Icon />
        </div>
      </div>
    </motion.div>
  )
}

function AdminDashboard() {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 })
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true)
        const [statsRes, apptRes, docRes] = await Promise.all([
          axiosInstance.get('/admin-api/dashboard'),
          axiosInstance.get('/appointment-api/'),
          axiosInstance.get('/doctor-api/doctors')
        ])

        setStats({
          doctors: statsRes.data.doctorsCount,
          patients: statsRes.data.patientsCount,
          appointments: statsRes.data.appointmentsCount
        })
        setAppointments(apptRes.data.payload || [])
        setDoctors(docRes.data.payload || [])
      } catch (err) {
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  if (loading) return <Loader />

  // Chart data — appointments by status
  const statusCounts = ['Pending', 'Approved', 'Completed', 'Cancelled'].map(s => ({
    name: s,
    count: appointments.filter(a => a.status === s).length
  }))

  // Doctor specialization distribution for Pie
  const specMap = {}
  doctors.forEach(d => {
    const spec = d.specialization || 'Other'
    specMap[spec] = (specMap[spec] || 0) + 1
  })
  const pieData = Object.entries(specMap).map(([name, value]) => ({ name, value }))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className='mb-8'>
        <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Overview</p>
        <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>Admin Dashboard</h1>
      </div>

      {/* Stats */}
      <div className='grid md:grid-cols-3 gap-6 mb-10'>
        <StatCard icon={FaUserMd}       label='Total Doctors'      value={stats.doctors}      color='border-cyan-500'    index={0} />
        <StatCard icon={FaUsers}        label='Total Patients'     value={stats.patients}     color='border-indigo-500'  index={1} />
        <StatCard icon={FaCalendarCheck} label='Total Appointments' value={stats.appointments} color='border-emerald-500' index={2} />
      </div>

      {/* Charts row */}
      <div className='grid md:grid-cols-2 gap-6 mb-10'>
        {/* Appointments by status */}
        <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900'>
          <h2 className='text-xl font-bold text-slate-800 dark:text-white mb-6'>Appointments by Status</h2>
          {statusCounts.every(s => s.count === 0) ? (
            <EmptyState title='No appointments yet' />
          ) : (
            <ResponsiveContainer width='100%' height={220}>
              <BarChart data={statusCounts}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
                <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey='count' radius={[8, 8, 0, 0]}>
                  {statusCounts.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Doctor specialization pie */}
        <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900'>
          <h2 className='text-xl font-bold text-slate-800 dark:text-white mb-6'>Doctor Distribution</h2>
          {pieData.length === 0 ? (
            <EmptyState title='No doctors registered yet' />
          ) : (
            <ResponsiveContainer width='100%' height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%' cy='50%'
                  outerRadius={80}
                  dataKey='value'
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent appointments */}
      <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900'>
        <h2 className='text-xl font-bold text-slate-800 dark:text-white mb-6'>Recent Appointments</h2>
        {appointments.length === 0 ? (
          <EmptyState icon={FaCalendarCheck} title='No appointments yet' />
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-slate-100 dark:border-slate-800'>
                  <th className='pb-3 text-left text-slate-500 font-semibold'>Patient</th>
                  <th className='pb-3 text-left text-slate-500 font-semibold'>Doctor</th>
                  <th className='pb-3 text-left text-slate-500 font-semibold'>Date</th>
                  <th className='pb-3 text-left text-slate-500 font-semibold'>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 8).map(a => (
                  <tr key={a._id} className='border-b border-slate-50 hover:bg-slate-50 transition dark:border-slate-800 dark:hover:bg-slate-800/40'>
                    <td className='py-3 font-semibold text-slate-700 dark:text-slate-200'>{a.patientId?.name || '—'}</td>
                    <td className='py-3 text-slate-600 dark:text-slate-400'>Dr. {a.doctorId?.name || '—'}</td>
                    <td className='py-3 text-slate-500'>{new Date(a.appointmentDate).toLocaleDateString('en-IN')}</td>
                    <td className='py-3'>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        { Pending: 'bg-amber-100 text-amber-700', Approved: 'bg-emerald-100 text-emerald-700',
                          Completed: 'bg-cyan-100 text-cyan-700', Cancelled: 'bg-rose-100 text-rose-700' }[a.status]
                      }`}>{a.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AdminDashboard