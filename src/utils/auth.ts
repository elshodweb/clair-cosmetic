// utils/auth.ts
import axios from './axiosInstance';

export const login = async (username: string, password: string): Promise<void> => {
  try {
    const response = await axios.post('/api/v1/auth/login/', {
      username,
      password,
    });

    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;

    // Сохраняем токены в localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    throw new Error('Failed to login');
  }
};
