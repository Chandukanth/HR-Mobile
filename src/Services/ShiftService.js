import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class ShiftService {

    static async get() {
        try {

            const response = apiClient.get(`${endpoints().HrShiftApi}`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }
}

export default ShiftService;
