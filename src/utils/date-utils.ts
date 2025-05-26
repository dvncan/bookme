/**
 * Format a date to display in UI
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format time to display in UI
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}

/**
 * Format date range for display in UI
 */
export function formatDateRange(start: Date, end: Date): string {
  return `${formatDate(start)}, ${formatTime(start)} - ${formatTime(end)}`;
}

/**
 * Get all days in a month
 */
export function getDaysInMonth(year: number, month: number): Date[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => 
    new Date(year, month, i + 1)
  );
}

/**
 * Get days in current week
 */
export function getDaysInCurrentWeek(date: Date = new Date()): Date[] {
  const day = date.getDay(); // 0 is Sunday
  const diff = date.getDate() - day;
  
  return Array.from({ length: 7 }, (_, i) => {
    const newDate = new Date(date);
    newDate.setDate(diff + i);
    return newDate;
  });
}

/**
 * Generate time slots for a given day
 */
export function generateTimeSlots(
  date: Date, 
  startHour: number = 9, 
  endHour: number = 17, 
  durationMinutes: number = 60
): Date[] {
  const slots: Date[] = [];
  const slotCount = ((endHour - startHour) * 60) / durationMinutes;
  
  const startDate = new Date(date);
  startDate.setHours(startHour, 0, 0, 0);
  
  for (let i = 0; i < slotCount; i++) {
    const slotTime = new Date(startDate);
    slotTime.setMinutes(startDate.getMinutes() + (i * durationMinutes));
    slots.push(slotTime);
  }
  
  return slots;
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Get a readable relative time string
 */
export function getRelativeTimeString(date: Date): string {
  const formatter = new Intl.RelativeTimeFormat('en', { 
    numeric: 'auto' 
  });
  
  const now = new Date();
  const diffInDays = Math.round(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Tomorrow';
  if (diffInDays > 1 && diffInDays < 7) return formatter.format(diffInDays, 'day');
  
  return formatDate(date);
}