import { useAuth } from '@clerk/clerk-react';

export const useApiCall = () => {
  const { getToken } = useAuth();
  
  const apiCall = async (url, options = {}) => {
    const token = await getToken();
    
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };
  
  return { apiCall };
};