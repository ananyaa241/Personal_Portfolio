import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarPlus, FaArrowRight, FaShieldAlt, FaUserMd, FaHeartbeat } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'

const featureItems = [
  { icon: FaShieldAlt, text: 'Secure & HIPAA-compliant' },
  { icon: FaUserMd,    text: '250+ Specialist Doctors' },
  { icon: FaHeartbeat, text: '24/7 Patient Support' },
]

function Hero() {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Background */}
      <img
        src='https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2070'
        className='absolute inset-0 w-full h-full object-cover'
        alt='Hospital background'
      />
      <div className='absolute inset-0 hero-overlay' />

      {/* Content */}
      <div className='relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-8 py-32 w-full'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='inline-block bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md'
          >
            Trusted by 1M+ Patients
          </motion.div>

          <h1 className='mt-8 text-7xl font-black leading-tight text-white'>
            Advanced<br />Healthcare<br />For Modern<br />Families
          </h1>

          <p className='mt-8 text-xl text-slate-200 leading-relaxed max-w-xl'>
            Book appointments, manage prescriptions, monitor patient history and experience premium digital healthcare.
          </p>

          {/* Feature pills */}
          <div className='mt-8 flex flex-wrap gap-4'>
            {featureItems.map(({ icon: Icon, text }) => (
              <div key={text} className='flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm'>
                <Icon className='text-cyan-400' />
                {text}
              </div>
            ))}
          </div>

          <div className='mt-10 flex gap-4 flex-wrap'>
            <button
              onClick={() => isAuthenticated ? navigate('/appointments') : navigate('/register')}
              className='flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl transition hover:scale-105'
            >
              <FaCalendarPlus />
              {isAuthenticated ? 'View Appointments' : 'Book Appointment'}
            </button>
            <Link
              to='/doctors'
              className='flex items-center gap-2 glass text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition'
            >
              Browse Doctors <FaArrowRight className='text-sm' />
            </Link>
          </div>

          {/* Stats */}
          <div className='mt-16 flex gap-12 flex-wrap'>
            {[['1M+', 'Patients'], ['250+', 'Doctors'], ['50+', 'Specialities'], ['99%', 'Satisfaction']].map(([num, label]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className='text-5xl font-black text-white'>{num}</h2>
                <p className='text-slate-300 mt-2'>{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='relative hidden md:block'
        >
          <div className='glass rounded-[40px] p-8 shadow-2xl'>
            <img
              src='https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1974'
              className='rounded-[30px] shadow-2xl w-full object-cover max-h-[500px]'
              alt='Doctor consultation'
            />
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className='absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-2xl flex items-center gap-3'
            >
              <div className='h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600'>
                <FaHeartbeat />
              </div>
              <div>
                <p className='text-xs text-slate-500 font-semibold'>Status</p>
                <p className='text-sm font-black text-slate-900'>All Systems Normal</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero