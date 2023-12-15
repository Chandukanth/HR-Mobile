import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class LeaveService {


    static async get() {
        try {

            const response = apiClient.get(`${endpoints().HrLeaveTypeApi}`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }



}

export default LeaveService;
