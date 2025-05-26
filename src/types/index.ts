export interface Booking {
  id: string;
  title: string;
  start: Date;
  end: Date;
  attendee: {
    name: string;
    email: string;
    phone?: string;
  };
  notes?: string;
}

export interface TimeSlot {
  id: string;
  start: Date;
  end: Date;
  isAvailable: boolean;
}

export interface CalendarDay {
  date: Date;
  slots: TimeSlot[];
}

export type ViewMode = 'day' | 'week' | 'month';

export type ThemeMode = 'light' | 'dark';