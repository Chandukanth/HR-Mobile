import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { BackHandler, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Chat from "../../../assets/new.png";
import BottomSheet from "../../components/BottomSheet";
import ApproveButton from "../../components/buttons/ApproveButton";
import RejectButton from "../../components/buttons/RejectButton";
import Layout from "../../components/layout";
import DateFilter from "../../components/DateFilter";
import ChattingScreen from "../../components/Ui/chattingScreen";
import { screenHeight } from "../../lib/heightwidth";
import LeaveRequestService from "../../Services/LeaveRequestService";
import { formatDate } from "../../lib/Datetime";
import ApprovedButton from "../../components/buttons/ApprovedButton";

const LeaveRequest = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isChating, setIsChating] = useState(false);
    const [leaveData, setLeaveData] = useState([])
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
        getLeaveRequest()
    }, [])

    const getLeaveRequest = async () => {
        let response = await LeaveRequestService.get()
        setLeaveData(response.data)
    }

    const shortItems = (
        <View style={[styles.card, { height: 175 }]}>
            <View style={{ width: '97%', marginLeft: 4, marginRight: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Nov - 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>18 - Nov - 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Leave type </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
                </View>
            </View>
        </View>
    )

    const expandItems = (
        <View style={[styles.card, { height: screenHeight * 0.6 }]}>
            <View style={{ width: '97%', marginLeft: 4, marginRight: 25 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Employee</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Ashutosh Bhardwaj</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Nov - 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>18 - Nov - 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Leave type </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
                </View>
                <View style={{ marginLeft: 20, paddingTop: 20, }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                </View>
                <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '87%', marginLeft: 18, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Casual Leave</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginLeft: 20, marginTop: 10 }}>
                    <View style={{ width: '41.5%', marginTop: 10 }}>
                        <ApproveButton title={'Approve'} />
                    </View>
                    <View style={{ width: '41.5%', marginTop: 10, marginLeft: 10 }}>
                        <RejectButton title={'Reject'} />
                    </View>

                </View>
            </View>


        </View>
    )

    const submitLeave = async (item, id) => {
        let data = {
            status: item,
        }
        let response = await LeaveRequestService.patch(id, data)
        console.log("🚀 ~ file: leaveRequests.js:119 ~ submisstLeave ~ ressponse:", response)

    }

    return (
        <Layout title={'Leave Requests'} backButton={isChating} backPress={() => setIsChating(false)}>
            {isChating ? (
                <ChattingScreen shortItems={shortItems} expandItems={expandItems} />
            ) : (
                <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
                    <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                            <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                            <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2021</Text>
                        </View>
                        <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                            <Foundation name="filter" size={24} color="black" />

                        </View>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={{ alignItems: 'center', paddingTop: 20 }}>
                            {leaveData && leaveData.length > 0 && leaveData.map((item, index) => (
                                <View key={index} style={styles.card}>
                                    <View style={{ width: '97%', marginLeft: 4, marginRight: 25 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Employee</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Ashutosh Bhardwaj</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{formatDate(new Date(item?.created_at))}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{item?.from_date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To </Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{item?.to_date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Leave type </Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
                                        </View>
                                        <View style={{ marginLeft: 20, paddingTop: 20, }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '87%', marginLeft: 18, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>{item?.reason}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginLeft:item.status == 0 ? 20 : 0, marginTop: 10 }}>
                                            {item.status == 0 ? (
                                                <>
                                                    <View style={{ width: '34%', marginTop: 10 }}>
                                                        <ApproveButton onPress={() => submitLeave(1, item?.id)} title={'Approve'} />
                                                    </View>
                                                    <View style={{ width: '34%', marginTop: 10, marginLeft: 10 }}>
                                                        <RejectButton onPress={() => submitLeave(2, item?.id)} title={'Reject'} />
                                                    </View>
                                                </>
                                            ) : (
                                                <ApprovedButton />
                                            )}

                                            <TouchableOpacity onPress={() => setIsChating(true)} style={{ height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 10, width: 40, backgroundColor: '#f7f7f7', borderRadius: 8, marginLeft: 10 }}>
                                                <Image style={{ width: 30, height: 30, marginTop: 5 }} source={Chat} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>
                            ))}


                        </View>
                    </ScrollView>

                </View>
            )}


            {isDrawerVisible && (
                <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
            )}
        </Layout>
    )

}
export default LeaveRequest
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 440,
        width: '84%',
        borderRadius: 12,
        elevation: 5,
        marginBottom: 20

    }
})