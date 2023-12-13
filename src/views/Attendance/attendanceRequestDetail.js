import React, { useState } from "react";
import Layout from "../../components/layout";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "../../components/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import Absent from "../../../assets/days/absent.png"
import present from "../../../assets/days/present.png"


const AttendanceRequestDetail = (props) => {
    let params = props?.route?.params
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const navigation = useNavigation()

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    const years = [
        ...Array.from({ length: 2100 - 2012 + 1 }, (_, index) => 2012 + index),
    ];

    const data = [
        { date: '14 - dec - 2021', reason : 'Forgot_to_punch', button : 'Approve' },
        { date: '14 - dec - 2021', reason : 'Forgot_to_punch', button : 'Rejected' },
        { date: '14 - dec - 2021', reason : 'Forgot_to_punch', button : 'Approve', button2 : 'Reject' },
        { date: '14 - dec - 2021', reason : 'Forgot_to_punch', button : 'Approve', button2 : 'Reject' },
        { date: '14 - dec - 2021', reason : 'Forgot_to_punch', button : 'Approve', button2 : 'Reject' },

    ]

    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];
    return (
        <Layout title={'Attendance Requests'}>
            <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
                <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                        <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                        <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2019</Text>
                        <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-SemiBold' }}>{params?.name}</Text>
                    </View>

                </TouchableOpacity>

                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                    
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>For Date</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Current Status</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Absent</Text>
                            <Image style={{ width: 25, height: 25, marginRight: 30 }} source={Absent} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Change to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Present</Text>
                            <Image style={{ width: 25, height: 25, marginRight: 30 }} source={present} />
                        </View>
                        <View style={{ marginLeft: 20, paddingTop: 20, }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                        </View>
                        <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Forgot_to_punch</Text>
                        </View>
                        <TouchableOpacity onPress={toggleDrawer} style={{ width: '90%', height: 40, backgroundColor: '#DAECE2', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>
                            <Text style={{ color: '#48a272', fontFamily: 'Poppins-SemiBold' }}>Approved</Text>
                        </TouchableOpacity>

                    </View>
                </View>



                {isDrawerVisible && (
                    <BottomSheet isModalVisible={isDrawerVisible} setModalVisible={setDrawerVisible} toggleModal={toggleDrawer} >

                        <View style={{ flex: 0.70, flexDirection: "row", paddingTop: 20, justifyContent: 'space-evenly' }}>
                            <View style={{ width: '50%', }}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {monthNames.map((item) => (
                                        <View style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ textAlign: 'left' }}>{item}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={{ width: '50%', }}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {years.map((item) => (
                                        <View style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ textAlign: 'left' }}>{item}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>

                        </View>
                        <View style={{ position: 'absolute', bottom: 10, width: '100%', justifyContent: 'center', alignItems: 'center', left: 5 }}>
                            <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 40, backgroundColor: 'black', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins-Light' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>


                    </BottomSheet>
                )}
            </View>
        </Layout>
    )
}
export default AttendanceRequestDetail
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: '70%',
        width: '85%',
        borderRadius: 12,
        elevation: 5,

    }
})