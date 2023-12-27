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
import { formatDate, getTime } from "../../lib/Datetime";



const MyAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([])
    const [loggedInUser, setLoggedInUser] = useRecoilState(User)
    const [selectedProject, setSelectedProject] = useRecoilState(projectId)
    const [isLoading, setIsLoading] = useState(false)
    const [checkin, setCheckin] = useState([])
    const [checkedIn, setCheckedIn] = useState(false)


    useEffect(() => {
        getDetails()
    }, [])
    const getDetails = async () => {
        setIsLoading(true)
        const user = await LoggedInUserService.get()
        let checkinParams = {
            employee: user.id,
            timestamp__date: formatDate(new Date())
        }
        setLoggedInUser(user)
        let myAttendanceParams = {
            employee: user.id,
        }
        const response = await AttendanceService.get(myAttendanceParams);
        setAttendanceData(response?.data)
        const checkin = await CheckInService.get(checkinParams)
        setCheckin(checkin.data)
        setIsLoading(false)

    }

    const checkIn = async () => {
        let status
        if (checkin.length > 0) {
            status = 1
        } else {
            status = '0'
        }
        let data = {
            company: selectedProject ? selectedProject : 1,
            employee: loggedInUser?.id,
            status: status
        }
        const response = await CheckInService.post(data)
        console.log("🚀 ~ file: myAttendance.js:54 ~ checkIn ~ response:", response)
        setCheckedIn(!checkedIn)
        if (response) {
            getDetails()
        }
    }
    const footer = (
        <View style={{ borderTopWidth: 0.5, borderColor: 'lightgrey' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12, marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Checked in <Text style={{ fontFamily: 'Poppins-SemiBold' }}>-{checkin.length > 0 ? getTime(checkin[0].created_at) : null}</Text>
                    </Text>
                </View>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Shift <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- Morning</Text>
                    </Text>
                </View>
            </View>
            {checkin[1]?.status !== 1 ? (
                <BlackButton onPress={checkIn} title={checkin.length > 0 ? 'Check out' : 'Check in'} />
            ) : (
                <View style={{ width: '100%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>

                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Checked out <Text style={{ fontFamily: 'Poppins-SemiBold' }}>-{checkin.length > 0 ? getTime(checkin[0].timestamp) : null}</Text>
                    </Text>
                </View>
            )}
        </View>


    )
    return (
        <Layout isLoading={isLoading} title={`My Attendance`}>

            <Calender attendanceList={attendanceData} footer={footer} />

        </Layout>
    );
};

export default MyAttendance;
