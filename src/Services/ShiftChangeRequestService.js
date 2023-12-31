import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";
import Url from "../lib/Url";


class ShiftChangeRequestService {

    static async get(params) {
        try {
            let apiUrl = Url.get(`${endpoints().HrShiftChangeRequestApi}`, params)

            const response = apiClient.get(apiUrl)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }
    static async patch(id, data) {
        try {

            const response = apiClient.patch(`${endpoints().HrShiftChangeRequestApi}${id}/`, data)
            return (await response).data;
        } catch (error) {
            console.log(error?.response);
        }
    }

    static async post(data) {
        try {
            const response = apiClient.post(`${endpoints().HrShiftChangeRequestApi}`, data)
            return (await response).data;

        } catch (error) {
            console.log(error.response);
        }
    }
}

export default ShiftChangeRequestService;
