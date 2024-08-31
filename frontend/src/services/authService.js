import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

  export  const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

  export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken); 
  }
  return response.data;
};


 export  const getCurrentUser = async () => {   
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};





export default { register, login, getCurrentUser}


