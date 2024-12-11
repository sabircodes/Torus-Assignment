export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  region: string;
  registrationDate: string;
}

export interface AnalyticsState {
  metrics: {
    totalUsers: number;
    activeUsers: number;
    deletedUsers: number;
  };
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    region: string;
  };
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchTerm: string;
  activeTab: string;
}
