import { useEffect, useState } from "react"
import { dummyGenerationData, PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarIcon, ClockIcon, HistoryIcon, Loader2Icon, TimerIcon, Wand2Icon, XIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";


const AIComposer = () => {

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([])

   // Scheduling state
   const [activeScheduler, setActiveScheduler] = useState<any>(null);
   const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
   const [scheduledDate, setScheduledDate] = useState("");
   const [scheduledTime, setScheduledTime] = useState("");
   const [scheduling, setScheduling] = useState(false);

   const fetchGenerations = async () => {
    try {
      const { data } = await api.get("api/posts/generations")
      setGenerations(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
   }

   useEffect(()=>{
    fetchGenerations()
   },[])

   const handleGenerate = async ()=>{
    if(!prompt){
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true)
    try {
      const { data } = await api.post("/api/posts/generate", {prompt, tone, generateImage});
      setGenerations([data, ...generations]);
      setActiveScheduler(data)
      toast.success("Content generated!")
    } catch (error: any) {
       toast.error(error?.response?.data?.message || error?.message);
    }finally{
      setLoading(false)
    }
   }

   const handleSchedule = async ()=>{
    if(!activeScheduler) return;
    if(selectedPlatforms.length === 0){
       toast.error("Select at least one platform");
      return;
    }
    if(!scheduledDate || !scheduledTime){
      toast.error("Select date and time");
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    setScheduling(true);
    try {
      await api.post("/api/posts", {
        content: activeScheduler.content,
        mediaUrl: activeScheduler.mediaUrl,
        mediaType: activeScheduler.mediaType,
        platforms: selectedPlatforms,
        scheduledFor,
        status: "scheduled",
      })
        toast.success("AI Post scheduled!");
        setActiveScheduler(null)
        setSelectedPlatforms([]);
        setScheduledDate("");
        setScheduledTime("");
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "Failed to schedule");
    }finally{
      setScheduling(false);
    }
   }

   const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Input Section */}
      <div className="space-y-6 text-center mt-12 sm:mt-20 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-100 text-violet-600 text-xs px-3.5 py-1.5 rounded-full font-medium">
          <SparklesIcon className="size-3.5" />
          AI-Powered Content
        </div>
        <h1 className="text-3xl text-slate-700 tracking-tight font-medium">What should we create today?</h1>
        <div className="relative group mt-8 animate-fade-in-up delay-100">
          <textarea 
          className="w-full px-6 py-6 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 outline-none focus:border-red-200 focus:ring-2 focus:ring-red-100 transition-all resize-none h-40 shadow-sm"
          placeholder="Share your idea... (e.g. A post about the launch of our new eco-friendly coffee beans)" value={prompt} onChange={(e)=> setPrompt(e.target.value)}/>
          <div className="absolute bottom-4 right-3 flex items-center gap-3 text-sm">

            <button onClick={()=> setGenerateImage(!generateImage)} className="flex items-center gap-3 bg-red-50 py-2 px-3 rounded-lg border border-red-100 hover:bg-red-100/60 transition-colors">
              <span className="text-slate-600 text-xs font-medium">AI Image</span>
              <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${generateImage ? "bg-red-500" : "bg-slate-200"}`}>
                <span className={`pointer-events-none size-4 transform translate-y-0.5 rounded-full bg-white shadow transition ${generateImage ? "translate-x-4.5" : "translate-x-0.5"}`}/>
              </div>
            </button>

            <button onClick={handleGenerate} disabled={loading} className="group/btn bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:shadow-lg">
              {loading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin"/>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  Generate
                  <ArrowRightIcon className="size-4 transition-transform group-hover/btn:translate-x-0.5"/>
                </>
              )}
            </button>

          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up delay-200">
              {tones.map((t)=>(
                <button key={t} onClick={()=> setTone(t) } className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 border font-medium ${tone === t ? "bg-gradient-to-r from-red-500 to-red-600 border-red-500 text-white shadow-sm shadow-red-200/50" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"}`}>
                  {t}
                </button>
              ))}
        </div>
      </div>

      {/* AI Generated Posts */}
      <div className="space-y-6 pt-12 border-t border-slate-100 animate-fade-in-up delay-300">
          <div className="flex items-center justify-between text-slate-600">
            <div className="flex items-center gap-2">
              <HistoryIcon className="size-5"/>
              <h2 className="text-xl font-medium">Recent Generations</h2>
            </div>
            <span className="text-sm text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">{generations.length} total</span>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {generations.map((gen)=>(
                <div key={gen._id} className="card-hover group bg-white rounded-2xl border border-slate-100 p-5 relative overflow-hidden">
                  <div className="flex flex-col h-full space-y-4">

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">{new Date(gen.createdAt).toLocaleString()}</span>
                      <span className="text-xs text-violet-500 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100 font-medium">{gen.tone}</span>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">{gen.content}</p>

                    {gen.mediaUrl && (
                      <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                        <img src={gen.mediaUrl} alt="Gen" className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"/>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <button 
                      onClick={()=> setActiveScheduler(gen)}
                      className="flex-1 bg-slate-100 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white text-slate-600 text-xs py-2.5 rounded-lg transition-all duration-300 font-medium">
                        Schedule Post
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {
                generations.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-3">
                    <div className="size-14 bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl flex items-center justify-center mx-auto border border-violet-100">
                      <Wand2Icon className="size-6 text-violet-300" />
                    </div>
                    <p className="text-slate-500 text-sm">No content generated yet. Try generating some content using the AI.</p>
                  </div>
                )
              }
          </div>
      </div>

      {/* Scheduler Modal */}
      {activeScheduler && (
        <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 w-full max-w-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-scale-in">

            <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-transparent">
              <h3 className="text-slate-900 font-medium">Schedule Generation</h3>
              <button onClick={()=>setActiveScheduler(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                <XIcon className="size-5"/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              <div className="bg-gradient-to-br from-slate-50 to-slate-50/50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.prompt}</p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-50/50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.content}</p>
                {activeScheduler.mediaUrl && <img src={activeScheduler.mediaUrl} alt="preview" className="w-full aspect-video object-cover rounded-xl border border-slate-200 shadow-sm"/>}
              </div>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100 space-y-8">
              {/* Options */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-slate-600 uppercase tracking-widest mb-4 font-medium">Select Channels</label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p)=>{
                      const active = selectedPlatforms.includes(p.id);
                      return (
                        <button key={p.id} onClick={()=> setSelectedPlatforms((prev)=> (prev.includes(p.id) ? prev.filter((x)=>x !== p.id) : [...prev, p.id]))}
                        className={`p-2.5 rounded-xl border text-xs transition-all duration-200 ${active ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400 shadow-sm" : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}>
                          <p.icon className="size-[18px]"/>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <CalendarIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input type="date" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-red-200 focus:ring-2 focus:ring-red-100 transition-all" value={scheduledDate} onChange={(e)=>setScheduledDate(e.target.value)}/>
                  </div>
                  <div className="relative">
                    <ClockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input type="time" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-red-200 focus:ring-2 focus:ring-red-100 transition-all" value={scheduledTime} onChange={(e)=>setScheduledTime(e.target.value)}/>
                  </div>
                </div>
              </div>
              <button onClick={handleSchedule} className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg hover:shadow-red-200 transition-all duration-300 active:scale-[0.98]">
                {scheduling ? <Loader2Icon className="size-4 animate-spin"/> : <TimerIcon className="size-4"/>}
                 Schedule Post
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default AIComposer
