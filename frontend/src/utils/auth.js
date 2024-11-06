// src/utils/auth.js
import jwt_decode from "jwt-decode";

export const getCurrentUserId = () => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  if (token) {
    const decoded = jwt_decode(token);
    return decoded.user_id; // Adjust based on your token structure
  }
  return null;
};
