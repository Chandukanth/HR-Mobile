import React, { useState } from "react";
import Layout from "../../components/layout";
import Calender from "../../components/Calender";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet from "../../components/BottomSheet";
// import ModalSheet from 'react-modal-sheet';
const TeamAttendance = () => {
    const [visible, setVisible] = useState(false);

    const openModal = () => {
        setVisible(!visible);
    };


    const footer = (
        <View style={{ borderTopWidth: 2, borderColor: 'lightgrey' }}>
            <TouchableOpacity onPress={openModal} style={{ width: '95%', height: 40, backgroundColor: 'white', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, borderColor: 'lightgrey' }}>
                {/* <Text style={{ color: 'white', fontFamily: 'Poppins-Light' }}>Check out</Text> */}
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
                <View style={{ width: '50%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 2, paddingLeft: 15, height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Check-in
                    </Text>
                </View>
                <View style={{ width: '50%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 2, paddingLeft: 15, height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Check-out
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
                            <View key={item} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'lightgrey' }} />
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item}</Text>

                            </View>
                        ))}

                    </View>

                </BottomSheet>
            )}



        </Layout>
    )

}
export default TeamAttendance