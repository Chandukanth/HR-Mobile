import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class CheckInService {


    static async get() {
        try {

            const response = apiClient.get(`${endpoints().HrCheckInApi}`)
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
