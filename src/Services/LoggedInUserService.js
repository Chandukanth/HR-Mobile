import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class LoggedInUserService {


    static async get() {
        try {

            const response = apiClient.get(`https://api-7372.qelza.com/company_user/me`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }
   



}

export default LoggedInUserService;
