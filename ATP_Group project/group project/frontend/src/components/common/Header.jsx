import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaMoon, FaSun, FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Doctors', to: '/doctors' },
    { label: 'Appointments', to: '/appointments' }
  ]

  return (
    <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl text-slate-900 dark:border-slate-700 dark:bg-slate-950/95 dark:text-slate-100'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link to='/' className='flex items-center gap-4'>
          <div className='h-14 w-14 rounded-3xl bg-cyan-500 flex items-center justify-center text-3xl font-black text-white shadow-soft'>
            M
          </div>
          <div>
            <h1 className='text-2xl font-black tracking-tight'>MediCare+</h1>
            <p className='text-sm tracking-[0.35em] uppercase text-slate-500 dark:text-slate-400'>Hospital System</p>
          </div>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className='font-medium text-slate-700 hover:text-cyan-500 transition dark:text-slate-200'
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                className='flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-200'
              >
                <FaUserCircle />
                {user?.name || 'Profile'}
              </button>
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className='rounded-2xl bg-slate-950 px-5 py-3 text-white transition hover:bg-slate-800'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='font-medium text-slate-700 hover:text-cyan-500 transition dark:text-slate-200'>
                Login
              </Link>
              <Link
                to='/register'
                className='rounded-2xl bg-cyan-500 px-5 py-3 text-white shadow-lg transition hover:bg-cyan-600'
              >
                Get Started
              </Link>
            </>
          )}

          <button
            onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
            className='rounded-full border border-slate-200 p-3 text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-200'
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <button
          className='block md:hidden p-3 text-slate-700 transition dark:text-slate-200'
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className='md:hidden border-t border-slate-200 bg-white/95 px-6 py-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95'>
          <div className='flex flex-col gap-3'>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className='block rounded-3xl px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/profile')
                  }}
                  className='w-full rounded-3xl border border-slate-200 px-4 py-3 text-left text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    logout()
                    navigate('/login')
                  }}
                  className='w-full rounded-3xl bg-slate-950 px-4 py-3 text-white hover:bg-slate-800'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='block rounded-3xl px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='block rounded-3xl bg-cyan-500 px-4 py-3 text-white hover:bg-cyan-600'
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            <button
              onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
              className='mt-3 flex items-center justify-center rounded-3xl border border-slate-200 px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-200'
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />} Toggle Theme
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header