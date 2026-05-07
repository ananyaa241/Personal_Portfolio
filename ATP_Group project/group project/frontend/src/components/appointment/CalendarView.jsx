import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaCalendarAlt } from 'react-icons/fa'
import axiosInstance from '../../api/axiosInstance'
import Loader from '../common/Loader'
import EmptyState from '../common/EmptyState'

const STATUS_DOT = {
  Pending:   'bg-amber-400',
  Approved:  'bg-emerald-400',
  Completed: 'bg-cyan-400',
  Cancelled: 'bg-rose-400',
}

function CalendarView() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getEvents() {
      try {
        const res = await axiosInstance.get('/appointment-api/calendar/events')
        setEvents(res.data.payload || [])
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load calendar events')
      } finally {
        setLoading(false)
      }
    }
    getEvents()
  }, [])

  if (loading) return <Loader />

  // Group by date
  const grouped = {}
  events.forEach(ev => {
    const date = new Date(ev.start).toLocaleDateString('en-IN', { dateStyle: 'full' })
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(ev)
  })

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className='mb-8'>
        <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Schedule</p>
        <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>Appointment Calendar</h1>
      </div>

      {events.length === 0 ? (
        <div className='rounded-3xl bg-white p-12 shadow-xl dark:bg-slate-900'>
          <EmptyState
            icon={FaCalendarAlt}
            title='No appointments scheduled'
            message='Calendar events will appear here once appointments are booked.'
          />
        </div>
      ) : (
        <div className='space-y-6'>
          {Object.entries(grouped).map(([date, dayEvents], i) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className='rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900'
            >
              <h2 className='font-bold text-slate-700 dark:text-slate-300 mb-4 text-sm uppercase tracking-widest'>
                {date}
              </h2>
              <div className='space-y-3'>
                {dayEvents.map((ev, j) => (
                  <div key={j} className='flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-800'>
                    <div className={`h-3 w-3 rounded-full flex-shrink-0 ${STATUS_DOT[ev.status] || 'bg-slate-400'}`} />
                    <div className='flex-1'>
                      <p className='font-semibold text-slate-800 dark:text-slate-200'>{ev.title}</p>
                      <p className='text-xs text-slate-500 mt-0.5'>
                        {new Date(ev.start).toLocaleTimeString('en-IN', { timeStyle: 'short' })}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      { Pending: 'bg-amber-100 text-amber-700', Approved: 'bg-emerald-100 text-emerald-700',
                        Completed: 'bg-cyan-100 text-cyan-700', Cancelled: 'bg-rose-100 text-rose-700' }[ev.status]
                    }`}>{ev.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default CalendarView