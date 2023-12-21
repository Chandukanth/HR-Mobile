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
}

export default ShiftChangeRequestService;
