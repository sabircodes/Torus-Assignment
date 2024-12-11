# Dynamic Analytics Dashboard

A modern, responsive dashboard application built with React, Redux, TypeScript, and Recharts, featuring user management and analytics visualization.

## Features

### User Management Dashboard
- View, search, and manage user data in a paginated table
- Filter users by name or email
- View detailed user information in a modal
- Delete users
- Responsive design for all screen sizes

### Analytics Dashboard
- Real-time metrics display
  - Total Users
  - Active Users
  - Deleted Users
- Interactive Data Visualizations
  - User Registration Trend (Line Chart)
  - Active vs Inactive Users (Pie Chart)
  - Users by Region (Bar Chart)
- Responsive layout that adapts to different screen sizes

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Type System**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/           # React components
│   ├── AnalyticsDashboard.tsx
│   ├── UserModal.tsx
│   └── UserTable.tsx
├── store/               # Redux store configuration
│   ├── index.ts
│   └── slices/
│       ├── userSlice.ts
│       └── analyticsSlice.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── data/                # Mock data and utilities
│   └── mockData.ts
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Features in Detail

### User Management
- Paginated table with 5 users per page
- Search functionality for filtering users
- Modal view for detailed user information
- Status indicators with color coding
- Delete user functionality

### Analytics
- Overview cards with key metrics
- Interactive charts:
  - 6-month registration trend
  - User status distribution
  - Regional distribution
- Responsive chart layouts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.