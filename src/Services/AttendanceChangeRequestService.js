import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class AttendnaceChangeRequestService {


    static async get() {
        try {
            const response = apiClient.get(`${endpoints().HrAttendanceChangeRequestApi}`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }




}

export default AttendnaceChangeRequestService;
