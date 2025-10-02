export default function SkeletonLoader() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="glass-container p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full skeleton" />
            <div className="flex-1 h-5 skeleton" style={{ width: `${60 + (i * 5)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
