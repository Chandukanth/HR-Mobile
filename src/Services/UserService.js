import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class UserService {


    static async get() {
        try {

            const response = apiClient.get(`https://auth-7372.qelza.com/user`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }
   



}

export default UserService;
