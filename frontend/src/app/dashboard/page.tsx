'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  BarChart3,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskList from '@/components/tasks/TaskList';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskForm from '@/components/tasks/TaskForm';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Loader from '@/components/shared/Loader';
import { useAuth } from '@/providers/AuthProvider';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskFilters as TaskFiltersType } from '@/types';

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  
  // State
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFiltersType>({
    category: searchParams?.get('category') || 'All',
    completed: searchParams?.get('completed') || 'all',
    priority: searchParams?.get('priority') || 'All',
    search: searchParams?.get('search') || '',
    sort: searchParams?.get('sort') || '-createdAt',
  });

  // Get tasks with filters
  const {
    tasks,
    stats,
    isLoading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  } = useTasks(filters);

  // Extract unique categories for filter dropdown - FIXED TYPE
  // Extract unique categories for filter dropdown
const uniqueCategories = [
  'All', 
  ...new Set(
    tasks
      .map((task: Task) => task.category || '') // Explicitly type task
      .filter((cat: string) => cat.trim() !== '') // Explicitly type cat
  )
] as string[];

  // Handle task operations
  const handleCreateTask = async (data: Partial<Task>) => {
    await createTask.mutateAsync(data);
    setShowTaskForm(false);
  };

  const handleUpdateTask = async (data: Partial<Task>) => {
    if (!editingTask) return;
    await updateTask.mutateAsync({ id: editingTask._id, data });
    setEditingTask(null);
  };

  const handleDeleteTask = async (task: Task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask.mutateAsync(task._id);
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
    }
  }, [authLoading, user]);

  if (authLoading) {
    return <Loader text="Loading dashboard..." />;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar onNewTask={() => setShowTaskForm(true)} />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's what's happening with your tasks today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats?.totalTasks || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats?.completedTasks || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats?.pendingTasks || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Productivity</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats?.totalTasks
                        ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
                        : 0}
                      %
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters & Actions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Tasks
                </h2>
                <Button onClick={() => setShowTaskForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </div>
              
              <Card className="mb-6">
                <TaskFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  categories={uniqueCategories}
                />
              </Card>
            </div>

            {/* Task List */}
            <Card>
              <TaskList
                tasks={tasks}
                loading={tasksLoading}
                onToggleTask={toggleTaskStatus}
                onEditTask={setEditingTask}
                onDeleteTask={handleDeleteTask}
                onCreateTask={() => setShowTaskForm(true)}
              />
            </Card>

            {/* Quick Tips */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Pro Tip
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use tags to categorize tasks for better organization.
                </p>
              </Card>
              
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Daily Goal
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Try to complete at least 5 tasks per day to stay productive.
                </p>
              </Card>
              
              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/30">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Statistics
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track your progress with detailed analytics and insights.
                </p>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          loading={createTask.isPending || updateTask.isPending}
        />
      )}
    </div>
  );
}