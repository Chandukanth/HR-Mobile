import React from "react";
import Layout from "../../components/layout";
import Calender from "../../components/Calender"

const MyShift = () => {
    return (
        <Layout title={'My Shift'}>
            <Calender shift={true}/>

        </Layout>
    )
}
export default MyShift