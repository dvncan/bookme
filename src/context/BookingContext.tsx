import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, TimeSlot } from '../types';

// Mock data - in a real app, this would come from an API
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    title: 'Product Demo',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    attendee: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
    },
    notes: 'Discussing new product features',
  },
  {
    id: '2',
    title: 'Interview',
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(15, 0, 0, 0)),
    attendee: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  },
];

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<Booking>;
  getAvailableSlots: (date: Date) => TimeSlot[];
  isSlotAvailable: (start: Date, end: Date) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  // In a real app, we would fetch bookings from an API here
  useEffect(() => {
    // Simulate API call
    const fetchBookings = async () => {
      // This would be an API call in a real app
      return MOCK_BOOKINGS;
    };

    fetchBookings().then((data) => setBookings(data));
  }, []);

  const addBooking = async (newBooking: Omit<Booking, 'id'>): Promise<Booking> => {
    // In a real app, this would be an API call
    const booking: Booking = {
      ...newBooking,
      id: Date.now().toString(), // Generate a unique ID
    };

    // Check availability before adding
    if (!isSlotAvailable(booking.start, booking.end)) {
      throw new Error('This time slot is no longer available');
    }

    setBookings((prev) => [...prev, booking]);
    return booking;
  };

  const isSlotAvailable = (start: Date, end: Date): boolean => {
    // Check if the time slot overlaps with any existing booking
    return !bookings.some((booking) => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      
      // Check for overlap
      return (
        (start >= bookingStart && start < bookingEnd) || // Start time falls within an existing booking
        (end > bookingStart && end <= bookingEnd) || // End time falls within an existing booking
        (start <= bookingStart && end >= bookingEnd) // New booking completely encompasses an existing booking
      );
    });
  };

  const getAvailableSlots = (date: Date): TimeSlot[] => {
    // Generate time slots for the given day (9 AM to 5 PM, 1-hour slots)
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 17;
    const slotDurationMinutes = 60;
    
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Reset to beginning of day
    
    for (let hour = startHour; hour < endHour; hour++) {
      const slotStart = new Date(targetDate);
      slotStart.setHours(hour, 0, 0, 0);
      
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDurationMinutes);
      
      // Skip slots in the past
      if (slotStart < new Date()) continue;
      
      const isAvailable = isSlotAvailable(slotStart, slotEnd);
      
      slots.push({
        id: `slot-${slotStart.toISOString()}`,
        start: slotStart,
        end: slotEnd,
        isAvailable,
      });
    }
    
    return slots;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        getAvailableSlots,
        isSlotAvailable,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}