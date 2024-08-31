import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


// Function to register a new user
  export  const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};



// Function to log in an existing user
   export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {  // If the response contains a token, store it in the local storage
      localStorage.setItem('token', response.data.token);
      console.log('Token stored:', localStorage.getItem('token'));
    }
    return response.data;
  };


  
// Function to get the current user's information
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  console.log('Token retrieved:', token);
  try {
     // Make a GET request to the /me endpoint with the authorization header containing the token
      const response = await axios.get(`${API_URL}/me`, {  
          headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error:', error.response);
      if (error.response && error.response.status === 401) {
          console.log('Refreshing token...');
          const newToken = await refreshToken();
          if (newToken) {
              console.log('Refreshed token:', newToken);
              localStorage.setItem('token', newToken); // Retry fetching user data with the new token
              return await getCurrentUser(); // Retry fetching user data
          } else {
              // Handle cases where token refresh fails
              throw new Error('Unable to refresh token');
          }
      }
      throw error;
  }
};
  

   

// Function to refresh the JWT token
  export const refreshToken = async () => {
    const token = localStorage.getItem('token');
    console.log('Refreshing token with:', token);
    try {
        const response = await axios.post(`${API_URL}/refresh-token`, { token });
        console.log('Refresh token response:', response.data);
        if (response.status === 200 && response.data.token) {
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
    return null;
};









// export default { register, login, getCurrentUser, refreshToken}


