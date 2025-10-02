import { CheckCircle2, ListTodo, Clock } from 'lucide-react';
import { FilterType } from './FilterBar';

interface EmptyStateProps {
  filter: FilterType;
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const messages = {
    all: {
      icon: ListTodo,
      title: 'No tasks yet',
      description: 'Add your first task to get started',
    },
    completed: {
      icon: CheckCircle2,
      title: 'No completed tasks',
      description: 'Complete some tasks to see them here',
    },
    pending: {
      icon: Clock,
      title: 'No pending tasks',
      description: 'All caught up! Great job!',
    },
  };

  const { icon: Icon, title, description } = messages[filter];

  return (
    <div className="glass-container p-8 sm:p-12 text-center">
      <div className="flex justify-center mb-3 sm:mb-4">
        <div className="float-animation">
          <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-400" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-1.5 sm:mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-slate-400">{description}</p>
    </div>
  );
}
