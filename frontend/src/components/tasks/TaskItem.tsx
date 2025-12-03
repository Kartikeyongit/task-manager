'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Tag,
  Flag,
  MoreVertical,
  Edit2,
  Trash2,
  Clock,
} from 'lucide-react';
import { Task } from '@/types';
import { cn, formatDate, getPriorityColor } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [showActions, setShowActions] = useState(false);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div
      className={cn(
        'group relative bg-white dark:bg-gray-800 rounded-xl border p-4 transition-all duration-200 hover:shadow-md',
        task.completed
          ? 'border-green-200 dark:border-green-800/30 opacity-75'
          : 'border-gray-200 dark:border-gray-700',
        isOverdue && 'border-red-200 dark:border-red-800/30'
      )}
    >
      {/* Checkbox & Main Content */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task)}
          className="mt-1 flex-shrink-0"
          aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
        >
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 hover:text-blue-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          {/* Task Title */}
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'text-base font-medium truncate',
                task.completed
                  ? 'text-gray-500 dark:text-gray-500 line-through'
                  : 'text-gray-900 dark:text-white'
              )}
            >
              {task.title}
            </h3>
            
            {/* More Actions Button */}
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
              
              {/* Dropdown Actions */}
              {showActions && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowActions(false)}
                  />
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <button
                      onClick={() => {
                        onEdit(task);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit Task
                    </button>
                    <button
                      onClick={() => {
                        onDelete(task);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Task
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Task Description */}
          {task.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Task Metadata */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {/* Priority */}
            <div className="flex items-center gap-1">
              <Flag className="h-4 w-4 text-gray-400" />
              <Badge
                variant={
                  task.priority === 'high'
                    ? 'error'
                    : task.priority === 'medium'
                    ? 'warning'
                    : 'success'
                }
                className="text-xs"
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>

            {/* Category */}
            {task.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-gray-400" />
                <Badge className="text-xs">{task.category}</Badge>
              </div>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span
                  className={cn(
                    'text-xs',
                    isOverdue
                      ? 'text-red-600 dark:text-red-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {formatDate(task.dueDate)}
                  {isOverdue && ' (Overdue)'}
                </span>
              </div>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{task.tags.length - 3}</span>
                )}
              </div>
            )}

            {/* Created Date */}
            <div className="flex items-center gap-1 ml-auto">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator (for subtasks if any) */}
      {false && ( // Placeholder for future feature
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>2/5</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: '40%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}