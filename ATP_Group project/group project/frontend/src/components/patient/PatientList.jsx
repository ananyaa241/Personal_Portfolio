import { useEffect, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaSearch, FaUsers, FaTrash, FaHeartbeat } from 'react-icons/fa'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../context/AuthContext'
import SkeletonCard from '../common/SkeletonCard'
import EmptyState from '../common/EmptyState'

function PatientList() {
  const { role } = useContext(AuthContext)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  async function fetchPatients(query = '') {
    try {
      setLoading(true)
      const url = query.trim()
        ? `/patient-api/search/${encodeURIComponent(query.trim())}`
        : '/patient-api/patients'
      const res = await axiosInstance.get(url)
      setPatients(res.data.payload || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load patients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPatients() }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchPatients(searchQuery), 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  async function handleDelete(id) {
    if (!window.confirm('Remove this patient?')) return
    try {
      await axiosInstance.delete(`/patient-api/delete-patient/${id}`)
      toast.success('Patient removed')
      fetchPatients(searchQuery)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
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
          <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Registry</p>
          <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>Patients</h1>
        </div>
        {/* Search */}
        <div className='relative w-full max-w-sm'>
          <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
          <input
            type='text'
            placeholder='Search by name...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-5 py-3 text-slate-700 outline-none focus:border-cyan-400 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className='grid md:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} className='h-52' />
          ))}
        </div>
      ) : patients.length === 0 ? (
        <EmptyState icon={FaUsers} title='No patients found' message='Try a different search term.' />
      ) : (
        <div className='grid md:grid-cols-3 gap-6'>
          <AnimatePresence>
            {patients.map((patient, i) => (
              <motion.div
                key={patient._id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className='relative rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900'
              >
                {/* Avatar */}
                <div className='flex items-center gap-4'>
                  <div className='h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-2xl font-black text-cyan-600 dark:text-cyan-300'>
                    {patient.name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h2 className='text-lg font-bold text-slate-800 dark:text-white'>
                      {patient.name}
                    </h2>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>{patient.email}</p>
                  </div>
                </div>

                {/* Details */}
                <div className='mt-5 grid grid-cols-2 gap-3'>
                  {patient.age && (
                    <div className='rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800'>
                      <p className='text-xs text-slate-400'>Age</p>
                      <p className='font-bold text-slate-700 dark:text-slate-200'>{patient.age} yrs</p>
                    </div>
                  )}
                  {patient.gender && (
                    <div className='rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800'>
                      <p className='text-xs text-slate-400'>Gender</p>
                      <p className='font-bold text-slate-700 dark:text-slate-200 capitalize'>{patient.gender}</p>
                    </div>
                  )}
                  {patient.bloodGroup && (
                    <div className='rounded-2xl bg-rose-50 px-3 py-2 dark:bg-rose-900/20'>
                      <p className='text-xs text-rose-400'>Blood Group</p>
                      <p className='font-bold text-rose-600 dark:text-rose-300'>{patient.bloodGroup}</p>
                    </div>
                  )}
                  {patient.phone && (
                    <div className='rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800'>
                      <p className='text-xs text-slate-400'>Phone</p>
                      <p className='font-bold text-slate-700 dark:text-slate-200'>{patient.phone}</p>
                    </div>
                  )}
                </div>

                {role === 'admin' && (
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className='absolute right-5 top-5 rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-400 hover:bg-rose-100 transition dark:border-rose-800 dark:bg-rose-900/30'
                  >
                    <FaTrash size={11} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && patients.length > 0 && (
        <p className='mt-5 text-sm text-slate-500 dark:text-slate-400'>
          Showing <strong>{patients.length}</strong> patients
        </p>
      )}
    </motion.div>
  )
}

export default PatientList