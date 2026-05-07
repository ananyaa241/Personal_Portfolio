import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaSearch, FaUserMd, FaStar, FaClock, FaGraduationCap } from 'react-icons/fa'
import { MdOutlineAttachMoney } from 'react-icons/md'
import axiosInstance from '../../api/axiosInstance'
import SkeletonCard from '../common/SkeletonCard'
import EmptyState from '../common/EmptyState'

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  async function fetchDoctors(query = '') {
    try {
      setLoading(true)
      const url = query.trim()
        ? `/doctor-api/search/${encodeURIComponent(query.trim())}`
        : '/doctor-api/doctors'
      const res = await axiosInstance.get(url)
      setDoctors(res.data.payload || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDoctors() }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => fetchDoctors(searchQuery), 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='py-6'
    >
      {/* Header */}
      <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Our Specialists</p>
          <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>Meet Our Doctors</h1>
          <p className='mt-2 text-slate-500 dark:text-slate-400'>
            Experienced specialists delivering world-class healthcare.
          </p>
        </div>
        {/* Search */}
        <div className='relative w-full max-w-sm'>
          <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
          <input
            type='text'
            placeholder='Search by name or specialization...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-5 py-3 text-slate-700 outline-none focus:border-cyan-400 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className='grid md:grid-cols-3 gap-8'>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} className='h-[420px]' />
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <EmptyState
          icon={FaUserMd}
          title='No doctors found'
          message='Try a different name or specialization.'
        />
      ) : (
        <div className='grid md:grid-cols-3 gap-8'>
          {doctors.map((doc, i) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className='rounded-3xl bg-white shadow-xl hover:shadow-2xl transition overflow-hidden group dark:bg-slate-900'
            >
              {/* Doctor avatar */}
              <div className='relative overflow-hidden h-52 bg-gradient-to-br from-slate-800 to-cyan-900 flex items-center justify-center'>
                <div className='h-24 w-24 rounded-3xl bg-cyan-500/20 flex items-center justify-center text-5xl font-black text-cyan-300'>
                  {doc.name?.charAt(0) || 'D'}
                </div>
              </div>

              <div className='p-7'>
                <h2 className='text-2xl font-black text-slate-800 dark:text-white'>
                  Dr. {doc.name}
                </h2>
                <p className='mt-1 text-cyan-500 font-semibold'>{doc.specialization}</p>

                <div className='mt-5 space-y-2'>
                  {doc.experience > 0 && (
                    <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm'>
                      <FaStar className='text-amber-400' />
                      <span>{doc.experience} Years Experience</span>
                    </div>
                  )}
                  {doc.qualification && (
                    <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm'>
                      <FaGraduationCap className='text-cyan-400' />
                      <span>{doc.qualification}</span>
                    </div>
                  )}
                  {doc.consultationFee > 0 && (
                    <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm'>
                      <MdOutlineAttachMoney className='text-emerald-400' />
                      <span>₹{doc.consultationFee} Consultation</span>
                    </div>
                  )}
                </div>

                <div className='mt-6 flex gap-3'>
                  <span className='flex-1 rounded-2xl bg-cyan-50 py-2 text-center text-xs font-bold text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300'>
                    {doc.specialization}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default Doctors