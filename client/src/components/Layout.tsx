import { useState } from 'react'
import Sidebar from './Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { MenuIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const pageTitles: Record<string, string> = {
    "/dashboard" : "Dashboard",
    "/accounts": "Social Accounts",
    "/schedule": "Post Scheduler",
    "/ai-composer": "AI Composer",
}

const pageSubtitles: Record<string, string> = {
    "/dashboard": "Here's what's happening with your social accounts",
    "/accounts": "Manage your connected social media platforms",
    "/schedule": "Create and schedule posts across platforms",
    "/ai-composer": "Generate AI-powered content for your audience",
}

const Layout = () => {

    const {isAuthenticated, isLoading} = useAuth()

    const location = useLocation()

    const title = pageTitles[location.pathname] || "SocialAI";
    const subtitle = pageSubtitles[location.pathname] || "Manage and automate your social presence";

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    if(isLoading){
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white">
                <div className="flex flex-col items-center gap-3">
                    <div className='size-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin'/>
                    <span className="text-sm text-slate-400">Loading...</span>
                </div>
            </div>
        )
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

  return (
    <div className='flex h-screen bg-gradient-to-br from-slate-50 to-slate-100/50'>

        {/* Mobile Overlay */}
    {isMobileMenuOpen && <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity' onClick={()=> setIsMobileMenuOpen(false)}/>}

        <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}/>

    <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top Bar */}
        <header className='h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center px-4 md:px-8 gap-4'>

            <button className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors" onClick={()=>setIsMobileMenuOpen(true)}>
                <MenuIcon className="size-5"/>
            </button>
            <div>
                <h1 className="text-slate-900 font-medium">{title}</h1>
                <p className="text-sm text-slate-400 hidden sm:block">{subtitle}</p>
            </div>

        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12">
            <div className="page-enter">
                <Outlet />
            </div>
        </main>

    </div>

    </div>
  )
}

export default Layout