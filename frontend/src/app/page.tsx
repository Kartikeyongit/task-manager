import Link from 'next/link';
import { CheckCircle, Calendar, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Organize Your Work, 
            <span className="text-blue-600 dark:text-blue-400"> Boost Your Productivity</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            A modern task management application that helps you stay organized, focused, and productive.
            Free forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-800 dark:text-white text-lg font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Task Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Create, organize, and prioritize tasks with ease.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Calendar className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Deadline Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Never miss a deadline with smart reminders.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <TrendingUp className="h-12 w-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Progress Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">Track your productivity with detailed insights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}