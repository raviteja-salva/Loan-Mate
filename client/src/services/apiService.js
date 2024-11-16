import axios from 'axios';

const BASE_URL = 'https://loan-mate.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token.startsWith('Bearer') ? token : `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const token = localStorage.getItem('token');

export const loanService = {
    // Get all loans with filters
    getLoans: async (params) => {
      try {
        const response = await api.get('/loans', { params });
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
  
    // Create a new loan
    createLoan: async (loanData) => {
        try {
          // Validate user authentication
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Authentication required');
          }
    
          // Format data to match backend schema
          const formattedData = {
            principalAmount: Number(loanData.principalAmount),
            duration: Number(loanData.maxDuration),
            interestRate: Number(loanData.interestRate),
            purpose: loanData.purpose.trim()
          };
    
          // Make the API call with proper authorization
          const response = await api.post('/loans/offers', formattedData);
          return response.data;
        } catch (error) {
          if (error.response?.data) {
            // Handle specific backend errors
            throw {
              message: error.response.data.message || 'Failed to create loan offer',
              status: error.response.data.status || 'error'
            };
          }
          throw {
            message: error.message || 'An error occurred while creating the loan',
            status: 'error'
          };
        }
      },
      
  
    // Apply for a loan
    applyForLoan: async (loanId) => {
      try {
        const response = await api.post(`/loans/apply/${loanId}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    }
  };
  
  export default {
    loanService
  };

export const fetchUserLoans = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/loans/user/loans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.givenLoans;
    } catch (error) {
      console.error('Error fetching loans:', error.response?.data || error.message);
      throw error;
    }
};
  
  // Approve/Reject loan
export const updateLoanStatus = async (loanId, status, token) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/loans/${loanId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data.loan;
    } catch (error) {
      console.error('Error updating loan status:', error.response?.data || error.message);
      throw error;
    }
};

export const fetchUserStats = async (userId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${BASE_URL}/loans/stats/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveLoan = async (loanId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.patch(`${BASE_URL}/loans/${loanId}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchGivenLoans = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${BASE_URL}/loans/user/given-loans`, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch loans');
  }
};

export const fetchTakenLoans = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${BASE_URL}/loans/user/taken-loans`, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch loans');
  }
};

export const payLoan = async (loanId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      `${BASE_URL}/loans/${loanId}/pay`, 
      {}, 
      {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to pay loan');
  }
};
