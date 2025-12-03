import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksAPI } from '@/lib/api';
import { Task, TaskFilters } from '@/types';
import toast from 'react-hot-toast';

export const useTasks = (filters?: TaskFilters) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => tasksAPI.getTasks(filters).then((res) => res.data),
  });

  const createTask = useMutation({
    mutationFn: (data: Partial<Task>) => tasksAPI.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create task');
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      tasksAPI.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update task');
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: string) => tasksAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete task');
    },
  });

  const toggleTaskStatus = (task: Task) => {
    updateTask.mutate({
      id: task._id,
      data: { completed: !task.completed },
    });
  };

  return {
    tasks: data?.data || [],
    stats: data?.stats,
    isLoading,
    error,
    refetch,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
};