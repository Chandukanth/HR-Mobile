import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { BackHandler, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateFilter from "../../components/DateFilter";
import Layout from "../../components/layout";
import ApproveButton from "../../components/buttons/ApproveButton";
import RejectButton from "../../components/buttons/RejectButton";
import ChatButton from "../../components/buttons/ChatButton";
import ChattingScreen from "../../components/Ui/chattingScreen";
import ShiftChangeRequestService from "../../Services/ShiftChangeRequestService";
import { formatDate } from "../../lib/Datetime";
import ApprovedButton from "../../components/buttons/ApprovedButton";
import RejectedButton from "../../components/buttons/RejectedButton";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ShiftApplications = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [shiftData, setShiftData] = useState([])
    const [isChating, setIsChating] = useState(false)

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    useEffect(() => {
        if (isChating) {
            const backAction = () => {
                setIsChating(false)
                return true;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

            return () => {
                backHandler.remove();
            };
        }

    }, [isChating]);

    useEffect(() => {
        getShiftApplications()
    }, [])

    const getShiftApplications = async () => {
        let response = await ShiftChangeRequestService.get()
        setShiftData(response.data)
    }

    const submitShift = async (status, id) => {
        let data = {
            status: status
        }

        let response = await ShiftChangeRequestService.patch(id, data)
        getShiftApplications()
        console.log("🚀 ~ file: shiftApplication.js:57 ~ submitShift ~ response:", response)
    }

    const shortItems = (
        <View style={[styles.card, { height: 220 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied on</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From Date</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Nov - 2021</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To Date</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>18 - Nov - 2021</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>New Shift</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
            </View>
        </View>
    )

    const expandItems = (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied on</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From Date</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Nov - 2021</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To Date</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>18 - Nov - 2021</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>New Shift</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
            </View>
            <View style={{ marginLeft: 20, paddingTop: 10, }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Reason</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20, alignItems: 'center' }}>
                <View style={{ width: '40%' }}>
                    <ApproveButton title={'Approve'} />

                </View>
                <View style={{ width: '40%', marginLeft: 10 }}>
                    <RejectButton title={'Reject'} />
                </View>
                <View style={{ width: '40%', marginBottom: 8 }}>
                    <ChatButton onPress={() => setIsChating(true)} />
                </View>
            </View>

        </View>
    )

    return (
        <Layout title={'Shift Applications'} backButton={isChating} backPress={() => setIsChating(false)}>
            {isChating ? (
                <ChattingScreen shortItems={shortItems} expandItems={expandItems} />
            ) : (
                <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
                    <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                            <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                            <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2023</Text>
                        </View>
                        <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                            <Foundation name="filter" size={24} color="black" />

                        </View>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={{ backgroundColor: '#f7f7f7' }}>

                            <View style={{ alignItems: 'center', paddingTop: 20 }}>
                                {shiftData && shiftData.length > 0 && shiftData.map((item, index) => (
                                    <View key={index} style={[styles.card, { height: item.status !== 0 ? 440 : 430 }]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey', }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Employee</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{item.employee.username}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied on</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{item.from_date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From Date</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{item.from_date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To Date</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{item?.to_date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>New Shift</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Regular Shift</Text>
                                        </View>
                                        <View style={{ marginLeft: 20, paddingTop: 10, }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>
                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>{item?.reason}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginLeft: item.status == 0 ? 20 : 0, marginTop: 10 }}>
                                            {item.status == 0 ? (
                                                <>
                                                    <View style={{ width: '34%', marginTop: 10 }}>
                                                        <ApproveButton onPress={() => submitShift(1, item?.id)} title={'Approve'} />
                                                    </View>
                                                    <View style={{ width: '34%', marginTop: 10, marginLeft: 10 }}>
                                                        <RejectButton onPress={() => submitShift(2, item?.id)} title={'Reject'} />
                                                    </View>
                                                </>
                                            ) : (
                                                <>
                                                    {item.status == 2 ? (
                                                        <RejectedButton />
                                                    ) : <ApprovedButton />}
                                                </>


                                            )}

                                            <View style={{ width: '40%', marginBottom: 8 }}>
                                                <ChatButton onPress={() => setIsChating(true)} />
                                            </View>
                                        </View>


                                    </View>
                                ))}

                            </View>

                        </View>
                    </ScrollView>
                    {isDrawerVisible && (
                        <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
                    )}
                </View>
            )}


        </Layout>
    )

}
export default ShiftApplications
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 385,
        width: '85%',
        borderRadius: 12,
        elevation: 5,
        marginBottom: 20

    }
})