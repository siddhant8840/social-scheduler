import { CalendarDaysIcon, LayoutDashboardIcon, LogOutIcon, UsersIcon, Wand2Icon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen: (val: boolean) => void}) => {

    const {logout, user} = useAuth()

    const location = useLocation()

    const navItems = [
        {name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard"},
        { name: "Accounts", icon: UsersIcon, path: "/accounts" },
        { name: "Scheduler", icon: CalendarDaysIcon, path: "/schedule" },
        { name: "AI Composer", icon: Wand2Icon, path: "/ai-composer" },
    ]

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200/80 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

     {/* Logo */}
     <div className="p-6 pb-4">
        <div className='text-xl tracking-tight text-slate-800 flex items-center gap-2 group cursor-pointer'>
            <img src="/logo.svg" alt="logo" className='size-6 transition-transform group-hover:scale-110' />
            <span className="font-serif font-medium">Scheduler</span>
        </div>
     </div>

      {/* Nav section label */}
      <div className='px-6 py-2'>
        <span className='text-[10px] text-slate-400 uppercase tracking-[0.12em] font-medium'>Menu</span>
      </div>

       {/* Nav links */}
       <nav className='flex-1 px-3 space-y-1'>
            {navItems.map((item)=>{
                const isActive = location.pathname === item.path;

                return (
                    <NavLink key={item.name}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={()=>setIsOpen(false)} 
                    
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 border ${isActive ? "bg-gradient-to-r from-red-50 to-rose-50 text-red-600 border-red-100 shadow-sm shadow-red-100/50" : "text-slate-500 hover:bg-slate-50 border-transparent hover:text-slate-700"}`}>

                        <item.icon className={`size-[18px] shrink-0 transition-colors ${isActive ? "text-red-500" : "text-slate-400"}`} />
                        <span className="font-medium">{item.name}</span>
                        {isActive && <span className='ml-auto w-[5px] h-5 rounded-full bg-gradient-to-b from-red-400 to-red-500'/>}
                    </NavLink>
                )
            })}
       </nav>

       {/* User footer */}
       <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            <div className='size-9 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md shadow-red-200/50'>
                {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className='flex-1 min-w-0'>
                <div className='text-sm text-slate-800 truncate font-medium'>{user?.name}</div>
                <div className='text-xs text-slate-400 truncate'>{user?.email}</div>
            </div>
        </div>

        <button onClick={logout} className="mt-1 flex items-center gap-2.5 px-3 py-2.5 w-full rounded-xl text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200">
           <LogOutIcon className="size-4" />
           Sign Out
        </button>

       </div>

    </div>
  )
}

export default Sidebar