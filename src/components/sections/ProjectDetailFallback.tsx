export function ProjectDetailFallback() {
  return (
    <div className="animate-pulse bg-navy-900 text-white" aria-busy="true" aria-label="Loading project">
      <div className="container-x py-8">
        <p className="h-4 w-28 rounded-sm bg-white/10" />
      </div>
      <div className="min-h-[22rem] bg-white/5 md:min-h-[28rem]" />
      <div className="container-x space-y-4 py-16">
        <p className="h-3 w-24 rounded-sm bg-white/10" />
        <p className="h-12 max-w-xl rounded-sm bg-white/10" />
        <p className="h-20 max-w-2xl rounded-sm bg-white/10" />
      </div>
    </div>
  );
}
