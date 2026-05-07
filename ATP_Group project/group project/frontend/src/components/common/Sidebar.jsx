import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  FaUserMd, FaCalendarCheck, FaPrescriptionBottleAlt,
  FaUsers, FaChartLine, FaUserCircle, FaSignOutAlt, FaCalendarAlt
} from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'

const navBase = 'flex items-center gap-3 rounded-2xl px-5 py-3.5 text-slate-300 font-medium transition-all duration-200 text-sm'
const navActive = 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
const navInactive = 'hover:bg-slate-800 hover:text-white'

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${navBase} ${isActive ? navActive : navInactive}`}
    >
      <Icon className='flex-shrink-0' />
      {label}
    </NavLink>
  )
}

function Sidebar() {
  const { user, role, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <aside className='w-72 min-h-screen bg-slate-950 text-white flex flex-col px-6 py-8 hidden md:flex shadow-2xl flex-shrink-0'>
      {/* Brand */}
      <div className='mb-8 px-2'>
        <p className='text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold'>MediCare+</p>
        <h1 className='text-2xl font-black text-white mt-1'>Hospital System</h1>
      </div>

      {/* User Card */}
      <div className='mb-8 rounded-2xl bg-slate-900 border border-slate-800 p-5 flex items-center gap-4'>
        <div className='h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-xl font-black text-white flex-shrink-0'>
          {user?.name?.charAt(0)?.toUpperCase() || 'M'}
        </div>
        <div className='min-w-0'>
          <p className='font-bold text-white truncate'>{user?.name || 'User'}</p>
          <p className='text-xs text-cyan-400 capitalize mt-0.5'>{role || 'guest'}</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className='flex-1 space-y-1.5'>
        <NavItem to='/dashboard'     icon={FaChartLine}               label='Dashboard' />
        <NavItem to='/doctors'       icon={FaUserMd}                  label='Doctors' />
        {(role === 'admin' || role === 'doctor') && (
          <NavItem to='/patients'    icon={FaUsers}                   label='Patients' />
        )}
        <NavItem to='/appointments'  icon={FaCalendarCheck}           label='Appointments' />
        {(role === 'admin' || role === 'doctor') && (
          <NavItem to='/prescriptions' icon={FaPrescriptionBottleAlt} label='Prescriptions' />
        )}
        <NavItem to='/profile'       icon={FaUserCircle}              label='My Profile' />
      </nav>

      {/* Pro Tip */}
      <div className='mt-6 rounded-2xl bg-slate-900 border border-slate-800 p-5 text-xs text-slate-400 leading-relaxed'>
        <p className='font-semibold text-cyan-400 mb-1.5'>💡 Pro Tip</p>
        Use the status filters on the Appointments page to quickly track pending cases.
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className='mt-5 flex items-center gap-3 rounded-2xl px-5 py-3.5 text-slate-400 hover:bg-rose-900/30 hover:text-rose-300 transition text-sm font-medium'
      >
        <FaSignOutAlt /> Sign Out
      </button>
    </aside>
  )
}

export default Sidebar