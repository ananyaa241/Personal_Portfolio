import { Outlet } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'

function DashboardLayout() {
  return (
    <div className='flex min-h-screen bg-slate-100 dark:bg-slate-950'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto'>
        <div className='max-w-6xl mx-auto px-8 py-10'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout