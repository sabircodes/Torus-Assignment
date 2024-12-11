import { User } from '../types';
import { subMonths, format } from 'date-fns';

export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: Math.random() > 0.3 ? 'active' : 'inactive',
  region: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)],
  registrationDate: format(
    subMonths(new Date(), Math.floor(Math.random() * 6)),
    'yyyy-MM-dd'
  ),
}));

export const getRegistrationTrend = () => {
  const trend = Array.from({ length: 6 }, (_, i) => ({
    month: format(subMonths(new Date(), i), 'MMM'),
    users: Math.floor(Math.random() * 50) + 10,
  })).reverse();
  return trend;
};