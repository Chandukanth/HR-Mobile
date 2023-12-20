import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Text, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Calender from "../../components/Calender";
import { Button } from "react-native";
import BlackButton from "../../components/blackButton";
import AttendanceService from "../../Services/AttendanceService";
import { useQuery } from "@tanstack/react-query";
import LoggedInUserService from "../../Services/LoggedInUserService";
import { useRecoilState } from "recoil";
import { User, projectId } from "../../lib/atom";
import CheckInService from "../../Services/CheckinService";



const MyAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([])
    const [loggedInUser, setLoggedInUser] = useRecoilState(User)
    const [selectedProject, setSelectedProject] = useRecoilState(projectId)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        getDetails()
    }, [])
    const getDetails = async () => {
        setIsLoading(true)
        const user = await LoggedInUserService.get()
        setLoggedInUser(user)
        const response = await AttendanceService.get();
        setAttendanceData(response?.data)
        const checkin = await CheckInService.get()
        console.log(checkin, "Checkin");
        setIsLoading(false)

    }

    const checkIn = async () => {
        let data = {
            company: selectedProject,
            employee: loggedInUser?.id,

        }

        const response = await CheckInService.post(data)
        console.log(response, ">>>>>>>>");
    }
    const footer = (
        <View style={{ borderTopWidth: 0.5, borderColor: 'lightgrey' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12, marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Checked in <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- 9:30AM</Text>
                    </Text>
                </View>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Shift <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- Morning</Text>
                    </Text>
                </View>
            </View>
            <BlackButton onPress={checkIn} title={'Check out'} />
        </View>


    )
    return (
        <Layout isLoading={isLoading} title={`My Attendance`}>

            <Calender footer={footer} />

        </Layout>
    );
};

export default MyAttendance;
