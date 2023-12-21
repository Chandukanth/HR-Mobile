import React, { useEffect } from "react";
import Layout from "../../components/layout";
import Calender from "../../components/Calender"
import ShiftService from "../../Services/ShiftService";

const MyShift = () => {
    useEffect(() => {
        getShiftDetails()
    }, [])

    const getShiftDetails = async () => {
        let response = await ShiftService.get()
        console.log("🚀 ~ file: myShift.js:13 ~ getShiftDetails ~ response:", response)
    }
    return (
        <Layout title={'My Shift'}>
            <Calender shift={true} />

        </Layout>
    )
}
export default MyShift