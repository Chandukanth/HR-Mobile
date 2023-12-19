import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Text, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Calender from "../../components/Calender";
import { Button } from "react-native";
import BlackButton from "../../components/blackButton";
import AttendanceService from "../../Services/AttendanceService";
import { useQuery } from "@tanstack/react-query";



const MyAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([])
    useEffect(() => {
        getDetails()
    }, [])
    const getDetails = async () => {
        const response = await AttendanceService.get();
        setAttendanceData(response)
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
            <BlackButton title={'Check out'} />
        </View>


    )




    return (
        <Layout title={`My Attendance`}>
            
                <Calender footer={footer} />
           
        </Layout>
    );
};

export default MyAttendance;
