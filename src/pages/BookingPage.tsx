import React, { useState } from 'react';
import Calendar from '../components/ui/Calendar';
import TimeSlots from '../components/ui/TimeSlots';
import BookingForm, { BookingFormData } from '../components/ui/BookingForm';
import Confirmation from '../components/ui/Confirmation';
import { ViewMode, TimeSlot, Booking } from '../types';
import { useBooking } from '../context/BookingContext';
import { formatDate } from '../utils/date-utils';

enum BookingStep {
  SELECT_DATE,
  SELECT_TIME,
  FILL_DETAILS,
  CONFIRMATION
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SELECT_DATE);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  
  const { getAvailableSlots, addBooking } = useBooking();
  
  // Get available time slots for the selected date
  const availableSlots = getAvailableSlots(selectedDate);
  
  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setCurrentStep(BookingStep.SELECT_TIME);
  };
  
  // Handle time slot selection
  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep(BookingStep.FILL_DETAILS);
  };
  
  // Handle booking form submission
  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!selectedSlot) return;
    
    try {
      // Create booking
      const booking = await addBooking({
        title: formData.title,
        start: selectedSlot.start,
        end: selectedSlot.end,
        attendee: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        notes: formData.notes,
      });
      
      // Move to confirmation step
      setConfirmedBooking(booking);
      setCurrentStep(BookingStep.CONFIRMATION);
    } catch (error) {
      // In a real app, we would show an error message
      console.error('Error creating booking:', error);
    }
  };
  
  // Handle cancel booking
  const handleCancelBooking = () => {
    setSelectedSlot(null);
    setCurrentStep(BookingStep.SELECT_TIME);
  };
  
  // Handle close confirmation
  const handleCloseConfirmation = () => {
    // Reset the booking flow
    setSelectedDate(new Date());
    setSelectedSlot(null);
    setConfirmedBooking(null);
    setCurrentStep(BookingStep.SELECT_DATE);
  };
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Page header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Book Your Time Slot
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Select a date and time for your booking below
        </p>
      </div>
      
      {/* Main content */}
      <div className="max-w-3xl mx-auto">
        {/* Steps progress indicator */}
        <div className="flex items-center justify-between mb-8">
          {['Select Date', 'Select Time', 'Your Details', 'Confirmation'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${index < currentStep ? 'bg-green-500 text-white' : ''}
                ${index === currentStep ? 'bg-blue-500 text-white' : ''}
                ${index > currentStep ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400' : ''}
              `}>
                {index < currentStep ? (
                  <span className="text-sm">✓</span>
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span className={`
                ml-2 text-sm hidden sm:inline
                ${index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}
              `}>
                {step}
              </span>
              {index < 3 && (
                <div className="w-12 h-1 mx-2 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
        
        {/* Content based on the current step */}
        {currentStep === BookingStep.SELECT_DATE && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Select a Date
            </h2>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        )}
        
        {currentStep === BookingStep.SELECT_TIME && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Select a Time
            </h2>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-6">
              {formatDate(selectedDate)}
            </p>
            <TimeSlots
              slots={availableSlots}
              onSelectSlot={handleSlotSelect}
              selectedSlot={selectedSlot}
            />
          </div>
        )}
        
        {currentStep === BookingStep.FILL_DETAILS && selectedSlot && (
          <BookingForm
            selectedSlot={selectedSlot}
            onSubmit={handleBookingSubmit}
            onCancel={handleCancelBooking}
          />
        )}
        
        {currentStep === BookingStep.CONFIRMATION && confirmedBooking && (
          <Confirmation
            booking={confirmedBooking}
            onClose={handleCloseConfirmation}
          />
        )}
      </div>
    </main>
  );
}