import { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import FilterBar, { FilterType } from './components/FilterBar';
import EmptyState from './components/EmptyState';
import SkeletonLoader from './components/SkeletonLoader';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const counts = {
    all: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/50">
              <ListTodo className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Tasks
            </h1>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">
            Organize your life, one task at a time
          </p>
        </header>

        <main>
          <AddTodo onAdd={addTodo} />

          {!isLoading && todos.length > 0 && (
            <FilterBar
              activeFilter={filter}
              onFilterChange={setFilter}
              counts={counts}
            />
          )}

          {isLoading ? (
            <SkeletonLoader />
          ) : filteredTodos.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            <div className="space-y-0">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          )}
        </main>

        <footer className="mt-8 sm:mt-12 text-center text-slate-500 text-xs sm:text-sm px-2">
          <p className="hidden sm:block">Click a task to edit • Press Enter to save • Escape to cancel</p>
          <p className="sm:hidden">Tap to edit • Enter to save • Esc to cancel</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
