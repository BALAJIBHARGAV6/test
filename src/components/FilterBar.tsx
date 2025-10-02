import { List, CheckCircle2, Clock } from 'lucide-react';

export type FilterType = 'all' | 'completed' | 'pending';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    completed: number;
    pending: number;
  };
}

export default function FilterBar({ activeFilter, onFilterChange, counts }: FilterBarProps) {
  return (
    <div className="mb-6">
      <div className="glass-container p-4">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button
            onClick={() => onFilterChange('all')}
            className={`filter-btn flex items-center gap-2 ${
              activeFilter === 'all' ? 'active' : ''
            }`}
            aria-pressed={activeFilter === 'all'}
          >
            <List className="w-4 h-4" />
            <span>All</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-700/50 text-xs">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => onFilterChange('completed')}
            className={`filter-btn flex items-center gap-2 ${
              activeFilter === 'completed' ? 'active' : ''
            }`}
            aria-pressed={activeFilter === 'completed'}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-700/50 text-xs">
              {counts.completed}
            </span>
          </button>

          <button
            onClick={() => onFilterChange('pending')}
            className={`filter-btn flex items-center gap-2 ${
              activeFilter === 'pending' ? 'active' : ''
            }`}
            aria-pressed={activeFilter === 'pending'}
          >
            <Clock className="w-4 h-4" />
            <span>Pending</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-700/50 text-xs">
              {counts.pending}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
