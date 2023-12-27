import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Calender from "../../components/Calender";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import Avatar from "../../../assets/avatar/avatar.png"
import UserService from "../../Services/UserService";
import { useRecoilState } from "recoil";
import { User, projectId } from "../../lib/atom";
import { formatDate, getTime } from "../../lib/Datetime";
import AttendanceService from "../../Services/AttendanceService";
import CheckInService from "../../Services/CheckinService";
// import ModalSheet from 'react-modal-sheet';
const TeamAttendance = () => {
    const [visible, setVisible] = useState(false);
    const [selectedName, setSelectedName] = useState("")
    const [users, setUsers] = useState([]);
    const [attendanceData, setAttendanceData] = useState([])
    const [loggedInUser, setLoggedInUser] = useRecoilState(User)
    const [isLoading, setIsLoading] = useState(false)
    const [checkin, setCheckin] = useState([])

    useEffect(() => {
        if (users.length == 0) {
            getUsers()
        }
        getDetails()
    }, [])

    const openModal = () => {
        setVisible(!visible);
    };

    const getUsers = async () => {
        const response = await UserService.get()
        let userList = response.data.filter((item)=> item.id !== loggedInUser?.id)
        setUsers(userList);
    }

    const getDetails = async (item) => {
        setIsLoading(true)
       
        let checkinParams = {
            employee:item ? item.id : loggedInUser?.id,
            timestamp__date: formatDate(new Date())
        }

        let attendnaceParams = {
            employee:item ? item.id : loggedInUser?.id
        }
       
        const response = await AttendanceService.get(attendnaceParams);
        setAttendanceData(response?.data)
        const checkin = await CheckInService.get(checkinParams)
        setCheckin(checkin.data)
        setIsLoading(false)

    }
    const userSelect = (item) => {
        getDetails(item)
        setSelectedName(item.name)
        openModal()
    }


    const footer = (
        <View style={{ borderTopWidth: 0.5, borderColor: 'lightgrey' }}>
            <TouchableOpacity onPress={openModal} style={{ flexDirection: 'row', width: '95%', height: 40, backgroundColor: 'white', borderRadius: 8, justifyContent: selectedName ? 'flex-start' : 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, borderColor: 'lightgrey' }}>
                {selectedName && <Image source={Avatar} style={{ width: 25, height: 25, marginLeft: 10 }} />}
                <Text style={{ color: 'black', fontFamily: 'Poppins-SemiBold', opacity: 1, marginLeft: selectedName ? 10 : 0, marginTop: 5 }}>{selectedName ? selectedName : 'Select a team member'}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12, marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Checked in <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- {checkin.length > 0 ? getTime(checkin[0].created_at) : null}</Text>
                    </Text>
                </View>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Shift <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- Morning</Text>
                    </Text>
                </View>
            </View>


        </View>


    )

    return (
        <Layout isLoading={isLoading} title={'Team Attendance'}>
            <Calender attendanceList={attendanceData}  footer={footer} />
            {visible && (
                <BottomSheet height={500} isModalVisible={visible} setModalVisible={setVisible} toggleModal={openModal} >
                    <View style={{ paddingTop: 30, margin: 20, flex: 2 }}>

                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#808080' }}>Select Team Member</Text>
                        <ScrollView>
                            {users.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => userSelect(item)} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                                    <Image source={Avatar} style={{ width: 25, height: 25 }} />
                                    <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>


                    </View>

                </BottomSheet>
            )}



        </Layout>
    )

}
export default TeamAttendance