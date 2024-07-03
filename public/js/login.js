/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../js/alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      //这里由于API和website使用同样的URL直接删除localhost就可以发布了
      url: '/api/v1/users/login',
      // url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
      // url: 'http://localhost:3000/api/v1/users/logout',
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! try again');
  }
};
