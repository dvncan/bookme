import React from 'react';
import { Calendar } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Logo and site name */}
          <div className="flex items-center mb-4 md:mb-0">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">BookWise</span>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} BookWise. All rights reserved.
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            BookWise is a simple and elegant booking system that allows your customers to book available time slots.
          </p>
        </div>
      </div>
    </footer>
  );
}