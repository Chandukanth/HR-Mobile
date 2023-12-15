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

class apiClient {
  static async getSessionToken() {
    try {
      let refresh_token = await AsyncStorage.getItem(
        AsyncStorageConstants.REFRESH_TOKEN
      );
      console.log("Refresh_token", refresh_token);
      let body = {
        refresh_token
      };
      const response = await axiosClient.post(REFRESH_URL, body);
      console.log("Refresh_token2", response.data.refresh_token);
      await AsyncStorage.setItem(AsyncStorageConstants.REFRESH_TOKEN, response.data.refresh_token)
      return response.data.access_token;
    } catch (error) {
      console.log(error, ">sessionToken error");
      AsyncStorage.clearAll();
      navigate("Login", {})
    }
  }



  static async post(url, body) {
    try {
      let sessionToken = this.getSessionToken()
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
      let sessionToken = await this.getSessionToken()

      console.log(sessionToken, ">>>>>get>>>>>>>>>>>");

      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;

      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error.response.detail);
      throw error;
    }
  }

  static async put(url, body) {
    try {
      let sessionToken = this.getSessionToken()

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
      let sessionToken = this.getSessionToken()

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
          'Content-Type': 'multipart/form-data'
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
