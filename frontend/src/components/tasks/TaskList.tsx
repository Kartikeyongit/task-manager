'use client';

import { Task } from '@/types';
import TaskItem from './TaskItem';
import EmptyState from '../shared/EmptyState';
import Loader from '../shared/Loader';
import { ClipboardList, Plus } from 'lucide-react';
import Button from '../ui/Button';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onCreateTask: () => void;
}

export default function TaskList({
  tasks,
  loading,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onCreateTask,
}: TaskListProps) {
  if (loading) {
    return <Loader text="Loading tasks..." />;
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        description="Get started by creating your first task. Organize your work and boost productivity."
        actionLabel="Create First Task"
        onAction={onCreateTask}
        icon={<ClipboardList className="h-12 w-12 text-gray-400" />}
      />
    );
  }

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pending Tasks ({pendingTasks.length})
            </h2>
            <Button onClick={onCreateTask} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggleTask}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Completed ({completedTasks.length})
          </h2>
          <div className="space-y-3 opacity-75">
            {completedTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggleTask}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {tasks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Tasks
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completedTasks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {pendingTasks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}