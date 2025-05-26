import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon
} from 'lucide-react';
import { formatDate, isToday, getDaysInMonth } from '../../utils/date-utils';
import { ViewMode } from '../../types';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
  viewMode = 'month',
  onViewModeChange,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get month and year for the header
  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  
  // Get days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Handle month navigation
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };
  
  // Get all dates for the current month view
  const getMonthDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get all days in the current month
    const daysInMonth = getDaysInMonth(year, month);
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Get the last date of the previous month
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();
    
    // Get the dates from the previous month to fill the first row
    const prevMonthDates = Array.from(
      { length: firstDayOfMonth },
      (_, i) => new Date(year, month - 1, lastDateOfPrevMonth - firstDayOfMonth + i + 1)
    );
    
    // Get the dates for the next month to fill the last row
    const totalDaysToShow = 42; // 6 rows x 7 days
    const nextMonthDatesCount = totalDaysToShow - (prevMonthDates.length + daysInMonth.length);
    const nextMonthDates = Array.from(
      { length: nextMonthDatesCount },
      (_, i) => new Date(year, month + 1, i + 1)
    );
    
    return [...prevMonthDates, ...daysInMonth, ...nextMonthDates];
  };
  
  // Get calendar dates based on view mode
  const calendarDates = getMonthDates();
  
  // Handle date selection
  const handleDateClick = (date: Date) => {
    onDateSelect(date);
  };
  
  // Handle view mode change
  const handleViewModeChange = (mode: ViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };
  
  // Check if a date matches the selected date
  const isSelectedDate = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  // Determine if a date is from the current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon size={20} className="text-blue-500 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {monthYear}
          </h2>
        </div>
        
        <div className="flex items-center">
          <div className="flex mr-4">
            <button 
              className={`px-2 py-1 text-sm rounded-l ${viewMode === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
              onClick={() => handleViewModeChange('day')}
            >
              Day
            </button>
            <button 
              className={`px-2 py-1 text-sm ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
              onClick={() => handleViewModeChange('week')}
            >
              Week
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded-r ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
              onClick={() => handleViewModeChange('month')}
            >
              Month
            </button>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day labels */}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar dates */}
        {calendarDates.map((date, index) => {
          const isSelected = isSelectedDate(date);
          const isTodayDate = isToday(date);
          const inCurrentMonth = isCurrentMonth(date);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                py-2 rounded-md text-sm transition-all
                ${!inCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                ${isTodayDate && !isSelected ? 'border border-blue-500 font-bold' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}