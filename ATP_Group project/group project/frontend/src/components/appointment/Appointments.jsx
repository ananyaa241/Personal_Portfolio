import { useEffect, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  FaCalendarCheck, FaSearch, FaFilter, FaTrash, FaEdit,
  FaCalendarPlus
} from 'react-icons/fa'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../context/AuthContext'
import { SkeletonTable } from '../common/SkeletonCard'
import EmptyState from '../common/EmptyState'

const STATUS_STYLES = {
  Pending:   'bg-amber-100   text-amber-700   dark:bg-amber-900/40  dark:text-amber-300',
  Approved:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Completed: 'bg-cyan-100    text-cyan-700    dark:bg-cyan-900/40   dark:text-cyan-300',
  Cancelled: 'bg-rose-100    text-rose-700    dark:bg-rose-900/40   dark:text-rose-300',
}

const STATUSES = ['All', 'Pending', 'Approved', 'Completed', 'Cancelled']

function Appointments() {
  const { role } = useContext(AuthContext)
  const [appointments, setAppointments] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  async function fetchAppointments() {
    try {
      setLoading(true)
      const res = await axiosInstance.get('/appointment-api/')
      const data = res.data.payload || []
      setAppointments(data)
      setFiltered(data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAppointments() }, [])

  // Client-side filter
  useEffect(() => {
    let list = [...appointments]
    if (statusFilter !== 'All') list = list.filter(a => a.status === statusFilter)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(a =>
        a.patientId?.name?.toLowerCase().includes(q) ||
        a.doctorId?.name?.toLowerCase().includes(q)
      )
    }
    setFiltered(list)
  }, [statusFilter, searchQuery, appointments])

  async function handleDelete(id) {
    if (!window.confirm('Delete this appointment?')) return
    try {
      await axiosInstance.delete(`/appointment-api/delete/${id}`)
      toast.success('Appointment deleted')
      fetchAppointments()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await axiosInstance.put(`/appointment-api/update-status/${id}`, { status: newStatus })
      toast.success(`Status updated to ${newStatus}`)
      fetchAppointments()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
        <div>
          <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Healthcare</p>
          <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>Appointments</h1>
        </div>
      </div>

      {/* Filters Row */}
      <div className='flex flex-wrap gap-3 mb-6'>
        {/* Search */}
        <div className='relative flex-1 min-w-[200px]'>
          <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
          <input
            type='text'
            placeholder='Search patient or doctor...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-5 py-3 text-slate-700 outline-none focus:border-cyan-400 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
          />
        </div>
        {/* Status filter */}
        <div className='flex gap-2 flex-wrap'>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm transition ${
                statusFilter === s
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className='rounded-3xl bg-white shadow-xl overflow-hidden dark:bg-slate-900'>
        <table className='w-full min-w-[600px]'>
          <thead className='bg-slate-900 text-white dark:bg-slate-950'>
            <tr>
              {['Patient', 'Doctor', 'Date & Time', 'Symptoms', 'Status', ...(role !== 'patient' ? ['Actions'] : [])].map(h => (
                <th key={h} className='px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={role !== 'patient' ? 6 : 5}>
                <SkeletonTable rows={5} cols={role !== 'patient' ? 6 : 5} />
              </td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={role !== 'patient' ? 6 : 5}>
                <EmptyState
                  icon={FaCalendarCheck}
                  title='No appointments found'
                  message='Try changing your search or filter criteria.'
                />
              </td></tr>
            ) : (
              <AnimatePresence>
                {filtered.map((appt, i) => (
                  <motion.tr
                    key={appt._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className='border-b border-slate-100 hover:bg-slate-50 transition dark:border-slate-800 dark:hover:bg-slate-800/50'
                  >
                    <td className='px-6 py-5 font-semibold text-slate-800 dark:text-slate-200'>
                      {appt.patientId?.name || '—'}
                    </td>
                    <td className='px-6 py-5 text-slate-600 dark:text-slate-400'>
                      Dr. {appt.doctorId?.name || '—'}
                    </td>
                    <td className='px-6 py-5 text-slate-600 dark:text-slate-400'>
                      {new Date(appt.appointmentDate).toLocaleString('en-IN', {
                        dateStyle: 'medium', timeStyle: 'short'
                      })}
                    </td>
                    <td className='px-6 py-5 text-slate-500 dark:text-slate-400 max-w-[160px] truncate'>
                      {appt.symptoms || '—'}
                    </td>
                    <td className='px-6 py-5'>
                      {role !== 'patient' ? (
                        <select
                          value={appt.status}
                          onChange={e => handleStatusChange(appt._id, e.target.value)}
                          className={`rounded-full px-3 py-1 text-xs font-bold border-none outline-none cursor-pointer ${STATUS_STYLES[appt.status]}`}
                        >
                          {['Pending', 'Approved', 'Completed', 'Cancelled'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`rounded-full px-4 py-1.5 text-xs font-bold ${STATUS_STYLES[appt.status]}`}>
                          {appt.status}
                        </span>
                      )}
                    </td>
                    {role !== 'patient' && (
                      <td className='px-6 py-5'>
                        <button
                          onClick={() => handleDelete(appt._id)}
                          className='rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-rose-500 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-900/30'
                        >
                          <FaTrash size={12} />
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {/* Results count */}
      {!loading && filtered.length > 0 && (
        <p className='mt-4 text-sm text-slate-500 dark:text-slate-400'>
          Showing <strong>{filtered.length}</strong> of <strong>{appointments.length}</strong> appointments
        </p>
      )}
    </motion.div>
  )
}

export default Appointments