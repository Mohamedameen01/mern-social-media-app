
function PostLoader() {
  return (
    <div className=" h-60 border shadow rounded-md p-4 w-full">
    <div className="animate-pulse space-x-1">
      <div className="rounded-lg bg-slate-700 h-20 w-full"></div>
      <div className="flex-1 space-y-6 py-3">
        <div className="h-2 bg-slate-700 rounded w-20"></div>
        <div className="space-y-3">
          <div className="grid gap-4">
            <div className="h-2 bg-slate-700 rounded w-32"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-2 bg-slate-700 rounded w-10"></div>
            <div className="h-2 bg-slate-700 rounded w-10"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PostLoader;