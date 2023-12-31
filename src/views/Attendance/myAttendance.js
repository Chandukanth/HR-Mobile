import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Text, View, FlatList, ScrollView, TouchableOpacity, Alert, Modal, StyleSheet } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useIsFocused } from "@react-navigation/native";

const MyAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([])
    const [loggedInUser, setLoggedInUser] = useRecoilState(User)
    const [selectedProject, setSelectedProject] = useRecoilState(projectId)
    const [isLoading, setIsLoading] = useState(false)
    const [checkin, setCheckin] = useState([])
    const [checkedIn, setCheckedIn] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused()

    useEffect(() => {
        getDetails()
    }, [isFocused])
    const getDetails = async () => {
        setIsLoading(true)
        const user = await LoggedInUserService.get()
        let checkinParams = {
            employee: user[0].id,
            timestamp__date: formatDate(new Date())
        }
        setLoggedInUser(user[0])
        let myAttendanceParams = {
            employee: user[0].id,
        }
        const response = await AttendanceService.get(myAttendanceParams);
        setAttendanceData(response?.data)
        const checkin = await CheckInService.get(checkinParams)
        setCheckin(checkin.data)
        setIsLoading(false)

    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const checkingIn = (status) => {
        if (status == 0) {
            checkIn(status)
        } else {
            toggleModal()
        }
    }

    const checkIn = async (status) => {


        let data = {
            company: selectedProject ? selectedProject : 1,
            employee: loggedInUser?.id,
            status: status
        }
        const response = await CheckInService.post(data)
        setModalVisible(false)
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
            {checkin.length == 0 || checkin.length == 1 ? (
                <BlackButton onPress={() => checkingIn(checkin.length > 0 ? 1 : 0)} title={checkin.length > 0 ? 'Check out' : 'Check in'} />
            ) : (
                <>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity disabled={true} style={{ width: '95%', height: 55, backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: 'lightgrey', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                                Checked out <Text style={{ fontFamily: 'Poppins-SemiBold' }}>-{checkin.length > 0 ? getTime(checkin[0].timestamp) : null}</Text>
                            </Text>
                            <View style={{ width: 0.5, height: 40, backgroundColor: 'grey' }} />
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                                Hours <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- 00</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>

            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    toggleModal();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ minHeight: 150, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                            <Text style={{ textAlign: 'center', lineHeight: 24, fontFamily: 'Poppins-Regular' }} >If you checkout you can't check in again until your next shift starts.  {'\n'} {'\n'}Are you sure you want to check out?</Text>

                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end', marginLeft: 20, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => checkIn(1)} style={{ height: 40, width: '40%', backgroundColor: 'black', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 15 }}>{'Ok'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleModal} style={{ height: 40, width: '40%', backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 12, borderWidth: 1, marginLeft: 10 }}>
                                <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 15 }}>{'Cancel'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>



                </View>
            </Modal>
        </View>


    )
    return (
        <Layout isLoading={isLoading} title={`My Attendance`}>

            <Calender attendanceList={attendanceData} footer={footer} />

        </Layout>
    );
};

export default MyAttendance;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%'
    },
    modalContent: {
        backgroundColor: 'white',
        minHeight: 200,
        width: '75%',
        borderRadius: 10,
        elevation: 5,

    },
});