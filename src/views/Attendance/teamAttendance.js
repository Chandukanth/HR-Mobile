import React, { useState } from "react";
import Layout from "../../components/layout";
import Calender from "../../components/Calender";
import { View, Text, TouchableOpacity, Image } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import Avatar from "../../../assets/avatar/avatar.png"
// import ModalSheet from 'react-modal-sheet';
const TeamAttendance = () => {
    const [visible, setVisible] = useState(false);
    const [selectedName, setSelectedName] = useState("")

    const openModal = () => {
        setVisible(!visible);
    };

    const userSelect = (item) => {
        setSelectedName(item)
        openModal()
    }


    const footer = (
        <View style={{ borderTopWidth: 0.5, borderColor: 'lightgrey' }}>
            <TouchableOpacity onPress={openModal} style={{ flexDirection: 'row', width: '95%', height: 40, backgroundColor: 'white', borderRadius: 2, justifyContent: selectedName ? 'flex-start' : 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, borderColor: 'lightgrey' }}>
                {selectedName && <Image source={Avatar} style={{ width: 25, height: 25, marginLeft: 10 }} />}
                <Text style={{ color: 'black', fontFamily: selectedName ? 'Poppins-SemiBold' : 'Poppins-Light', opacity: selectedName ? 1 : 0.5, marginLeft: selectedName ? 10 : 0, marginTop: 5 }}>{selectedName ? selectedName : 'Select a team member'}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
                <View style={{ width: '50%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 2, paddingLeft: 15, height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Checked in <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- 9:30AM</Text>
                    </Text>
                </View>
                <View style={{ width: '50%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 2, paddingLeft: 15, height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Checked out <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- 7:30AM</Text>
                    </Text>
                </View>
            </View>


        </View>


    )

    const Name = ["Abhishek Polampally", "Aarav Magar", "Rati Bassi", "Neysa Bhagat", "Yashvi Badami", "Ashutosh Bharadwaj"]
    return (
        <Layout title={'Team Attendance'}>
            <Calender footer={footer} />
            {visible && (
                <BottomSheet isModalVisible={visible} setModalVisible={setVisible} toggleModal={openModal} >
                    <View style={{ paddingTop: 30, margin: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#808080' }}>Select Team Member</Text>
                        {Name.map((item) => (
                            <TouchableOpacity onPress={() => userSelect(item)} key={item} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                                <Image source={Avatar} style={{ width: 25, height: 25 }} />
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                </BottomSheet>
            )}



        </Layout>
    )

}
export default TeamAttendance