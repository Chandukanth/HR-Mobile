import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class LeaveRequestService {


    static async get() {
        try {

            const response = apiClient.get(`${endpoints().HrLeaveRequestApi}`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }



}

export default LeaveRequestService;
