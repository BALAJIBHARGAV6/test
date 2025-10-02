import { useState, useRef, useEffect } from 'react';
import { Check, X, CreditCard as Edit2, Trash2 } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ id, text, completed, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [showError, setShowError] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      setShowError(true);
      setTimeout(() => setShowError(false), 400);
      return;
    }
    onEdit(id, trimmedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
    setShowError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(id), 300);
  };

  return (
    <div className={`task-item glass-container p-3 sm:p-4 mb-2 sm:mb-3 ${isRemoving ? 'removing' : ''}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => onToggle(id)}
          className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
            completed
              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-500'
              : 'border-slate-500 hover:border-indigo-400 active:scale-95'
          }`}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {completed && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />}
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className={`flex-1 bg-slate-800/50 border-2 rounded-lg px-3 py-2 text-sm sm:text-base text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors ${
                showError ? 'error-shake' : 'border-slate-600'
              }`}
              placeholder="Task description..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between group">
            <span
              onClick={() => setIsEditing(true)}
              className={`flex-1 cursor-pointer transition-all duration-300 text-sm sm:text-base pr-2 ${
                completed ? 'text-slate-500 line-through' : 'text-slate-200'
              }`}
            >
              {text}
            </span>
            <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 sm:p-1.5 hover:bg-slate-700/50 active:bg-slate-700 rounded-lg transition-colors min-w-[32px] min-h-[32px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                aria-label="Edit task"
              >
                <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 sm:p-1.5 hover:bg-red-500/20 active:bg-red-500/30 rounded-lg transition-colors min-w-[32px] min-h-[32px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                aria-label="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
