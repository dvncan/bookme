import React from 'react';
import { formatTime } from '../../utils/date-utils';
import { TimeSlot } from '../../types';

interface TimeSlotsProps {
  slots: TimeSlot[];
  onSelectSlot: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot | null;
}

export default function TimeSlots({ 
  slots, 
  onSelectSlot,
  selectedSlot 
}: TimeSlotsProps) {
  // Group slots by morning/afternoon
  const morningSlots = slots.filter(slot => slot.start.getHours() < 12);
  const afternoonSlots = slots.filter(slot => slot.start.getHours() >= 12);

  // No available slots message
  if (slots.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No time slots available for this day. Please select another date.
      </div>
    );
  }
  
  // Render a time slot button
  const renderSlot = (slot: TimeSlot) => {
    const isSelected = selectedSlot?.id === slot.id;
    const isDisabled = !slot.isAvailable;
    
    return (
      <button
        key={slot.id}
        onClick={() => slot.isAvailable && onSelectSlot(slot)}
        disabled={isDisabled}
        className={`
          px-4 py-3 mb-2 rounded-lg border transition-all
          ${isSelected 
            ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
            : isDisabled 
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500' 
              : 'bg-white border-gray-200 hover:border-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500'
          }
        `}
      >
        <span className="block text-sm font-medium">
          {formatTime(slot.start)} - {formatTime(slot.end)}
        </span>
        <span className="block text-xs mt-1">
          {isDisabled ? 'Unavailable' : '60 min'}
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Morning slots */}
      {morningSlots.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Morning
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {morningSlots.map(renderSlot)}
          </div>
        </div>
      )}
      
      {/* Afternoon slots */}
      {afternoonSlots.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Afternoon
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {afternoonSlots.map(renderSlot)}
          </div>
        </div>
      )}
    </div>
  );
}