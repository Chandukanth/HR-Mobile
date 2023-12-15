import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class ShiftChangeRequestService {

    static async get() {
        try {

            const response = apiClient.get(`${endpoints().HrShiftChangeRequestApi}`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }
}

export default ShiftChangeRequestService;
