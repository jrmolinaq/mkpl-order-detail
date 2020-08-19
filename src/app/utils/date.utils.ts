import { differenceInCalendarDays, format, formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function setDaysFromToday(date: string): string {
  const daysOfDifference = differenceInCalendarDays(new Date(), new Date(date));
  const days = `${daysOfDifference} ${daysOfDifference > 1 ? 'días' : 'día'}`;
  return days;
}

export function formatDate(date: Date | number, dateFormat = 'dd/MM/yyyy') {
  return date ? format(new Date(date), dateFormat) : '00/00/0000';
}

export function formatDistance(date: Date) {
  return formatDistanceToNow(date, { locale: es });
}
