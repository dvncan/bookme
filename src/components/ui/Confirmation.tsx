import React from 'react';
import { Booking } from '../../types';
import { formatDateRange } from '../../utils/date-utils';
import { Check } from 'lucide-react';
import Button from './Button';

interface ConfirmationProps {
  booking: Booking;
  onClose: () => void;
}

export default function Confirmation({ booking, onClose }: ConfirmationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto text-center animate-scaleIn">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Booking Confirmed!
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Your booking has been successfully confirmed. We've sent the details to your email.
      </p>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
          {booking.title}
        </h3>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-medium">When: </span>
          {formatDateRange(booking.start, booking.end)}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Attendee: </span>
          {booking.attendee.name}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Need to make changes? You can cancel or reschedule this booking from the confirmation email.
      </p>
      
      <Button onClick={onClose} variant="primary" fullWidth>
        Done
      </Button>
    </div>
  );
}