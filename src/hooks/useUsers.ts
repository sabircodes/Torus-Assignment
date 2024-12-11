import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setCurrentPage, setSearchTerm, deleteUserWithAnalytics,setActiveTab } from '../store/slices/userSlice';

// Custom hook to manage user-related state and actions
export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);

  // Handler for deleting users
  const handleDelete = (id: string) => dispatch(deleteUserWithAnalytics(id));
  
  // Handler for pagination
  const handlePageChange = (page: number) => dispatch(setCurrentPage(page));
  
  // Handler for search functionality
  const handleSearch = (term: string) => dispatch(setSearchTerm(term));

  const handleActiveTabChange = (tab: string) => dispatch(setActiveTab(tab));

  return {
    ...users,
    handleDelete,
    handlePageChange,
    handleSearch,
    handleActiveTabChange,
  };
};