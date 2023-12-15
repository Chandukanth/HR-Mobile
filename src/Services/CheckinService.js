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



}

export default CheckInService;
