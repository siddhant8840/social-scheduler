import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon, SparklesIcon } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../api/axios"



const Dashboard = () => {

  const [stats, setStats] = useState({scheduled: 0, published: 0, connectedAccounts: 0})
  const [activities, setActivities] = useState<any[]>([])

  useEffect(()=>{
    const fetchDashboardData = async () => {
      try {
        const [postsRes, accountsRes, activityRes] = await Promise.all([api.get("/api/posts"), api.get("/api/accounts"), api.get("/api/activity")])

        const posts = postsRes.data;
        setStats({
          scheduled: posts.filter((p: any) => p.status === 'scheduled').length,
          published: posts.filter((p: any) => p.status === 'published').length,
          connectedAccounts: accountsRes.data.filter((a: any) => a.status === 'connected').length,
        })
        setActivities(activityRes.data)
      } catch (error: any) {
        console.error("Error fetching dashboard data", error)
      }
    };
    fetchDashboardData();
  },[])

  const statCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      trend: "+2 today",
      gradient: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      trend: "All time",
      gradient: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      trend: "Active",
      gradient: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome bar */}
      <div className="animate-fade-in-up">
        <h2 className="text-2xl text-slate-900 font-medium">Good morning! 👋</h2>
        <p className="text-slate-500 text-sm mt-0.5">Here's what's happening with your social accounts today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, i)=>(
          <div key={card.label} className="card-hover bg-white relative border border-slate-200/80 rounded-2xl p-6 overflow-hidden group animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
            {/* Subtle gradient accent on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
            
            <div className="flex items-center justify-between mb-4 relative">
              <div className={`size-10 rounded-xl ${card.bgLight} flex items-center justify-center`}>
                <card.icon className={`size-5 ${card.textColor}`} />
              </div>
              <div className={`text-xs ${card.textColor} flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-slate-100`}>
                <TrendingUpIcon className="size-3"/>
                {card.trend}
              </div>
            </div>
            
            <div className="text-3xl font-semibold text-slate-800 tabular-nums relative">{card.value}</div>
            <p className="text-sm text-slate-500 mt-1 relative">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden animate-fade-in-up delay-400">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
                <h2 className="text-slate-900 font-medium">Recent Activity</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">{activities.length} events</span>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
              <ActivityIcon className="size-6 text-slate-300"/>
            </div>
            <p className="text-slate-600 font-medium">No activity yet</p>
            <p className="text-slate-400 text-sm mt-1 max-w-xs text-center">Connect accounts and schedule posts to see events here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {activities.map((activity, index)=>(
              <div key={activity._id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                  <SendIcon className="size-4 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium">Published</span>
                    <span className="text-xs text-slate-400 shrink-0">{new Date(activity.createdAt).toLocaleString()}</span>
                  </div>
                    <p className="text-sm text-slate-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard