import { useEffect, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useForm, useFieldArray } from 'react-hook-form'
import { FaPrescriptionBottleAlt, FaPlus, FaTrash, FaSearch } from 'react-icons/fa'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../common/Loader'
import EmptyState from '../common/EmptyState'

function Prescription() {
  const { user, role } = useContext(AuthContext)
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [activeTab, setActiveTab] = useState(role === 'doctor' ? 'add' : 'view')

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      patientId: '',
      doctorId: role === 'doctor' ? user?._id || '' : '',
      appointmentId: '',
      notes: '',
      medicines: [{ medicineName: '', dosage: '', duration: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'medicines' })

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true)
        const [docRes, patRes] = await Promise.all([
          axiosInstance.get('/doctor-api/doctors'),
          axiosInstance.get('/patient-api/patients')
        ])
        setDoctors(docRes.data.payload || [])
        setPatients(patRes.data.payload || [])

        // Load prescriptions for the current user
        if (role === 'patient' && user?._id) {
          const rxRes = await axiosInstance.get(`/prescription-api/patient/${user._id}`)
          setPrescriptions(rxRes.data.payload || [])
        }
      } catch (err) {
        toast.error('Failed to load data')
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [user, role])

  async function onSubmit(data) {
    try {
      // Filter out empty medicine rows
      data.medicines = data.medicines.filter(m => m.medicineName.trim())
      await axiosInstance.post('/prescription-api/add', data)
      toast.success('Prescription added successfully')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add prescription')
    }
  }

  if (loadingData) return <Loader />

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className='mb-8'>
        <p className='text-cyan-500 uppercase tracking-widest text-xs font-bold'>Medical Records</p>
        <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>Prescriptions</h1>
      </div>

      {/* Tabs */}
      <div className='flex gap-2 mb-8'>
        {(role !== 'patient') && (
          <button
            onClick={() => setActiveTab('add')}
            className={`px-6 py-3 rounded-2xl font-semibold transition ${
              activeTab === 'add'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-white border border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            Add Prescription
          </button>
        )}
        <button
          onClick={() => setActiveTab('view')}
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            activeTab === 'view'
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'bg-white border border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
          }`}
        >
          View Records
        </button>
      </div>

      {/* Add Prescription Form */}
      <AnimatePresence mode='wait'>
        {activeTab === 'add' && role !== 'patient' && (
          <motion.div
            key='add'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900'>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  {/* Patient select */}
                  <label className='block'>
                    <span className='text-slate-600 dark:text-slate-300 font-medium'>Patient</span>
                    <select
                      {...register('patientId', { required: 'Patient is required' })}
                      className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                    >
                      <option value=''>Select patient...</option>
                      {patients.map(p => (
                        <option key={p._id} value={p._id}>{p.name} — {p.email}</option>
                      ))}
                    </select>
                    {errors.patientId && <p className='mt-1 text-sm text-rose-400'>{errors.patientId.message}</p>}
                  </label>

                  {/* Doctor select */}
                  <label className='block'>
                    <span className='text-slate-600 dark:text-slate-300 font-medium'>Doctor</span>
                    <select
                      {...register('doctorId', { required: 'Doctor is required' })}
                      className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                    >
                      <option value=''>Select doctor...</option>
                      {doctors.map(d => (
                        <option key={d._id} value={d._id}>Dr. {d.name} — {d.specialization}</option>
                      ))}
                    </select>
                    {errors.doctorId && <p className='mt-1 text-sm text-rose-400'>{errors.doctorId.message}</p>}
                  </label>

                  {/* Appointment ID */}
                  <label className='block md:col-span-2'>
                    <span className='text-slate-600 dark:text-slate-300 font-medium'>Appointment ID <span className='text-slate-400 font-normal'>(optional)</span></span>
                    <input
                      type='text'
                      {...register('appointmentId')}
                      placeholder='Paste appointment ObjectId...'
                      className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                    />
                  </label>
                </div>

                {/* Medicines */}
                <div>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='font-semibold text-slate-700 dark:text-slate-200'>Medicines</span>
                    <button
                      type='button'
                      onClick={() => append({ medicineName: '', dosage: '', duration: '' })}
                      className='flex items-center gap-2 rounded-2xl bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-600 hover:bg-cyan-100 transition dark:bg-cyan-900/30 dark:text-cyan-300'
                    >
                      <FaPlus size={11} /> Add Medicine
                    </button>
                  </div>
                  <div className='space-y-4'>
                    {fields.map((field, index) => (
                      <div key={field.id} className='grid md:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end'>
                        <div>
                          <span className='text-xs text-slate-500 mb-1 block'>Medicine Name</span>
                          <input
                            {...register(`medicines.${index}.medicineName`)}
                            placeholder='e.g. Paracetamol 500mg'
                            className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                          />
                        </div>
                        <div>
                          <span className='text-xs text-slate-500 mb-1 block'>Dosage</span>
                          <input
                            {...register(`medicines.${index}.dosage`)}
                            placeholder='e.g. 1-0-1'
                            className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                          />
                        </div>
                        <div>
                          <span className='text-xs text-slate-500 mb-1 block'>Duration</span>
                          <input
                            {...register(`medicines.${index}.duration`)}
                            placeholder='e.g. 5 days'
                            className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                          />
                        </div>
                        {fields.length > 1 && (
                          <button
                            type='button'
                            onClick={() => remove(index)}
                            className='rounded-2xl border border-rose-200 bg-rose-50 p-3 text-rose-400 hover:bg-rose-100 transition dark:border-rose-800 dark:bg-rose-900/30'
                          >
                            <FaTrash size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <label className='block'>
                  <span className='text-slate-600 dark:text-slate-300 font-medium'>Clinical Notes</span>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder='Additional instructions for the patient...'
                    className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-cyan-500 transition resize-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                  />
                </label>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-2xl bg-cyan-500 py-4 font-bold text-white transition hover:bg-cyan-600 disabled:opacity-60'
                >
                  {isSubmitting ? 'Saving...' : 'Save Prescription'}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* View Prescriptions */}
        {activeTab === 'view' && (
          <motion.div
            key='view'
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {prescriptions.length === 0 ? (
              <EmptyState
                icon={FaPrescriptionBottleAlt}
                title='No prescriptions found'
                message={role === 'patient' ? 'Your prescriptions will appear here after a consultation.' : 'No prescription records yet.'}
              />
            ) : (
              <div className='space-y-5'>
                {prescriptions.map((rx, i) => (
                  <motion.div
                    key={rx._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className='rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900'
                  >
                    <div className='flex items-start justify-between flex-wrap gap-3'>
                      <div>
                        <p className='text-sm text-slate-500'>
                          Prescribed by <strong className='text-cyan-500'>Dr. {rx.doctorId?.name || '—'}</strong>
                        </p>
                        <p className='text-xs text-slate-400 mt-1'>
                          {new Date(rx.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                        </p>
                      </div>
                    </div>
                    {/* Medicines */}
                    <div className='mt-5 grid md:grid-cols-3 gap-3'>
                      {rx.medicines?.map((med, j) => (
                        <div key={j} className='rounded-2xl bg-cyan-50 p-4 dark:bg-cyan-900/20'>
                          <p className='font-bold text-slate-800 dark:text-white'>{med.medicineName}</p>
                          <p className='text-xs text-slate-500 mt-1'>Dosage: {med.dosage}</p>
                          <p className='text-xs text-slate-500'>Duration: {med.duration}</p>
                        </div>
                      ))}
                    </div>
                    {rx.notes && (
                      <p className='mt-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4'>
                        📋 {rx.notes}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Prescription