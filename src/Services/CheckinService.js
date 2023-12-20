import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";
import Url from "../lib/Url";


class CheckInService {


    static async get(params) {
        try {
            let apiUrl = Url.get(`${endpoints().HrCheckInApi}`, params)

            const response = apiClient.get(apiUrl)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }
    static async post(data) {
        try {
            const response = apiClient.post(`${endpoints().HrCheckInApi}`, data)
            return (await response).data;

        } catch (error) {
            console.log(error.response);
        }
    }



}

export default CheckInService;
