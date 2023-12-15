import { endpoints } from "../helper/ApiendPoints";
import apiClient from "../ApiClients";


class CompanyService {


    static async get() {
        try {

            const response = apiClient.get(`${endpoints().CompanyApi}`)
            return (await response).data;

        } catch (err) {
            console.log(err);
        }
    }

   
}

export default CompanyService;
