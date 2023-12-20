import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class AttendanceService {


    static async get() {
        try {

            const response = apiClient.get(`${endpoints().AttendanceAPI}`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }

   
   

}

export default AttendanceService;
