import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAnalytics = () => {
  const analytics = useSelector((state: RootState) => state.analytics);
  return analytics;
};