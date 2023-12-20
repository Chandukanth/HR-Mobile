import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "../../components/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../../../assets/avatar/avatar.png"
import UserService from "../../Services/UserService";

const AttendanceRequest = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        getUserList()
    }, [])

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    const years = [
        ...Array.from({ length: 2100 - 2012 + 1 }, (_, index) => 2012 + index),
    ];

    const Data = [
        { name: 'Ashutosh Bhardwaj', request: '3 Requests' },
        { name: 'Abhishek Polampally', request: '3 Requests' },
        { name: 'Nesya Bhagat', request: '3 Requests' },
        { name: 'Yashvi Badami', request: '3 Requests' },
        { name: 'Aarav Magar', request: '3 Requests' },
        { name: 'Rati Bassi', request: '3 Requests' },

    ]

    const getUserList = async () => {
        setIsLoading(true)
        let response = await UserService.get()
        setUserList(response.data)
        setIsLoading(false)

    }

    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];
    return (
        <Layout isLoading={isLoading} title={'Attendance Requests'}>
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
            <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
                <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                        <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                        <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2019</Text>
                    </View>
                    <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                        <Foundation name="filter" size={24} color="black" />

                    </View>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 60, backgroundColor: '#fff', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'black', opacity: 0.7, fontFamily: 'Poppins-SemiBold', marginLeft: 20, marginTop: 8 }}>Name</Text>
                        <Text style={{ fontSize: 18, color: 'black', opacity: 0.7, fontFamily: 'Poppins-SemiBold', marginTop: 8 }}>Requests</Text>

                    </View>
                </View>
                <ScrollView>
                    {userList && userList.length > 0 && userList.map((item, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate('AttendanceRequestDetail', { name: item.name })} key={index} style={{ width: '100%', height: 60, backgroundColor: '#fff', marginTop: 10, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={Avatar} style={{ width: 25, height: 25 }} />
                                    <Text style={{ fontSize: 14, color: 'black', opacity: 0.7, fontFamily: 'Poppins-Regular', marginLeft: 8, marginTop: 2 }}>{item.name}</Text>

                                </View>
                                <Text style={{ fontSize: 14, color: 'black', opacity: 0.7, fontFamily: 'Poppins-Regular', marginRight: 20 }}>3 Requests</Text>

                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>



            </View>
        </Layout>
    )


}
export default AttendanceRequest