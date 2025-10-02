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
    <div className="mb-4 sm:mb-6">
      <div className="glass-container p-3 sm:p-4">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          <button
            onClick={() => onFilterChange('all')}
            className={`filter-btn flex items-center gap-1.5 sm:gap-2 ${
              activeFilter === 'all' ? 'active' : ''
            }`}
            aria-pressed={activeFilter === 'all'}
          >
            <List className="w-4 h-4" />
            <span className="text-xs sm:text-sm">All</span>
            <span className="ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-700/50 text-xs">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => onFilterChange('completed')}
            className={`filter-btn flex items-center gap-1.5 sm:gap-2 ${
              activeFilter === 'completed' ? 'active' : ''
            }`}
            aria-pressed={activeFilter === 'completed'}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Completed</span>
            <span className="ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-700/50 text-xs">
              {counts.completed}
            </span>
          </button>

          <button
            onClick={() => onFilterChange('pending')}
            className={`filter-btn flex items-center gap-1.5 sm:gap-2 ${
              activeFilter === 'pending' ? 'active' : ''
            }`}
            aria-pressed={activeFilter === 'pending'}
          >
            <Clock className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Pending</span>
            <span className="ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-700/50 text-xs">
              {counts.pending}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
