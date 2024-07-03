/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

//updateData Function
//type is either 'data' or 'password'
export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/${type === 'password' ? 'updateMyPassword' : 'updateMe'}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your ${type} have been updated successfully`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
