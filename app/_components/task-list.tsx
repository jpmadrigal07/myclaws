'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Check, X } from 'lucide-react';

export function TaskList() {
  const [newTaskText, setNewTaskText] = useState('');

  // Convex queries and mutations
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    await createTask({ text: newTaskText });
    setNewTaskText('');
  };

  const handleToggle = async (id: Id<'tasks'>) => {
    await toggleTask({ id });
  };

  const handleDelete = async (id: Id<'tasks'>) => {
    await removeTask({ id });
  };

  // Loading state
  if (tasks === undefined) {
    return (
      <div className="w-full max-w-md space-y-4">
        <div className="h-10 bg-gray-200 animate-pulse rounded-md" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Convex CRUD Example</h1>

      {/* Create Form */}
      <form onSubmit={handleCreateTask} className="flex gap-2">
        <Input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" disabled={!newTaskText.trim()}>
          <Plus size={20} />
        </Button>
      </form>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No tasks yet. Add one above!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              {/* Toggle Button */}
              <button
                onClick={() => handleToggle(task._id)}
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
                  task.isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {task.isCompleted && <Check size={14} />}
              </button>

              {/* Task Text */}
              <span
                className={`flex-1 ${
                  task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'
                }`}
              >
                {task.text}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(task._id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          {tasks.filter((t) => t.isCompleted).length} of {tasks.length} completed
        </div>
      )}
    </div>
  );
}
