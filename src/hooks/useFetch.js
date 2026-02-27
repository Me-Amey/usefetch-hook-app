import { useState, useEffect, useCallback } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    // Reset states when URL changes
    setLoading(true);
    setError(null);
    
    try {
      // Validate URL
      if (!url) {
        throw new Error('URL is required');
      }

      const response = await fetch(url);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      // Handle different types of errors
      if (err.name === 'TypeError') {
        setError('Network error: Please check your internet connection');
      } else if (err.message.includes('HTTP error')) {
        setError(`Server error: ${err.message}`);
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  // Return refetch function for manual retries
  return { data, loading, error, refetch: fetchData };
};

export default useFetch;