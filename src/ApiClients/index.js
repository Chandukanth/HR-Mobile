import axios from "axios";
import { API_URL, REFRESH_URL } from "../../config";
import AsyncStorage from "../lib/AsyncStorage";
import AsyncStorageConstants from "../helper/AsyncStorage";
import { navigate } from "../lib/RootNavigation";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    common: {
      Authorization: "",
    },
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let sessionToken = await apiClient.getSessionToken();
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // Handle refresh token error as needed, e.g., redirect to login
        navigate('Login'); 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

class apiClient {
  static async getSessionToken() {
    try {
      let refresh_token = await AsyncStorage.getItem(
        AsyncStorageConstants.REFRESH_TOKEN
      );
      let body = {
        refresh_token: refresh_token,
      };
      const response = await axiosClient.post(REFRESH_URL, body);
      await AsyncStorage.removeItem(AsyncStorageConstants.REFRESH_TOKEN)
      await AsyncStorage.setItem(
        AsyncStorageConstants.REFRESH_TOKEN,
        response.data.refresh_token
      );
      await AsyncStorage.setItem(AsyncStorageConstants.ACCESS_TOKEN, response.data.access_token)
      return response.data.access_token;
    } catch (error) {
      console.log(">sessionToken error :", error);

    }
  }

  static async post(url, body) {
    try {
      let sessionToken = await AsyncStorage.getItem(
        AsyncStorageConstants.ACCESS_TOKEN
      );
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;

      const response = await axiosClient.post(url, body);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async get(url) {
    try {
      let sessionToken = await AsyncStorage.getItem(
        AsyncStorageConstants.ACCESS_TOKEN
      );

      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;

      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async patch(url, body) {
    try {
      let sessionToken = await AsyncStorage.getItem(
        AsyncStorageConstants.ACCESS_TOKEN
      );
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;

      const response = await axiosClient.patch(url, body);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async put(url, body) {
    try {
      let sessionToken = await AsyncStorage.getItem(
        AsyncStorageConstants.ACCESS_TOKEN
      );
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;

      const response = await axiosClient.put(url, body);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async delete(url) {
    try {
      let sessionToken = await AsyncStorage.getItem(
        AsyncStorageConstants.ACCESS_TOKEN
      );
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;

      const response = await axiosClient.delete(url);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async fetch(url, bodyData) {
    try {
      let sessionToken = await AsyncStorage.getItem(
        AsyncStorageConstants.ACCESS_TOKEN
      );

      const response = await axios.post(url, bodyData, {
        headers: {
          Authorization: sessionToken,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default apiClient;

