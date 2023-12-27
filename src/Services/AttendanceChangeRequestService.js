import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";
import axios from "axios";
import { API_URL, REFRESH_URL } from "../../config";
import AsyncStorageObject from "../lib/AsyncStorage";
import AsyncStorage from "../helper/AsyncStorage";
import { navigate } from "../lib/RootNavigation";
import Url from "../lib/Url";
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

class AttendnaceChangeRequestService {



    static async get(params) {
        try {
            let refresh_token = await AsyncStorageObject.getItem(
                AsyncStorage.ACCESS_TOKEN
            );

            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${refresh_token}`;

            let apiUrl = Url.get(`${endpoints().HrAttendanceChangeRequestApi}`, params)

            const response = axiosClient.get(apiUrl)
            return (await response).data;

        } catch (err) {
            if (err?.request?.status === 403) {
                navigate('Login', {})
            }
            console.log(err?.request?.status);
        }
    }
    static async post(data) {
        try {
            const response = apiClient.post(`${endpoints().HrAttendanceChangeRequestApi}`, data)
            return (await response).data;

        } catch (error) {
            console.log(error.response);
        }
    }
    static async patch(id, data) {
        try {

            const response = apiClient.patch(`${endpoints().HrAttendanceChangeRequestApi}${id}/`, data)
            return (await response).data;
        } catch (error) {
            console.log(error?.response);
        }
    }



}

export default AttendnaceChangeRequestService;
