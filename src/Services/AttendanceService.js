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

    static async create(id, createData, callback) {
        try {
            if (createData) {

                let outletCreate = `${endpoints().AttendanceAPI}/${id}/`;

                apiClient
                    .patch(outletCreate, createData, (error, response) => {
                        if (response) {
                            return callback(null, response)
                        }
                        callback(error, [])

                    })
            }
        } catch (err) {
        }
    }

}

export default AttendanceService;
