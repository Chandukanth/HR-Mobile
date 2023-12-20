import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { BackHandler, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import Avatar from "../../../assets/avatar/avatar2.png";
import Chat from "../../../assets/new.png";
import DateFilter from "../../components/DateFilter";
import BlackButton from "../../components/blackButton";
import Layout from "../../components/layout";
import { User, isClosingState } from "../../lib/atom";
import ApprovedButton from "../../components/buttons/ApprovedButton";
import ChatButton from "../../components/buttons/ChatButton";
import StatusChat from "../../components/Ui/statusChat";
import ChattingScreen from "../../components/Ui/chattingScreen";
import { useNavigation } from "@react-navigation/core";
import { screenHeight } from "../../lib/heightwidth";
import LeaveRequestService from "../../Services/LeaveRequestService";
import { formatDate } from "../../lib/Datetime";

const MyLeaves = () => {
    const [isClosing, setIsClosing] = useRecoilState(isClosingState);
    const [loggedInUser, setLoggedInUser] = useRecoilState(User)
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isChating, setIsChating] = useState(false)
    const [leaveData, setLeaveData] = useState([])
    const [typing, setTyping] = useState(false)
    const [isCollapsed, setCollapsed] = useState(false)
    const [expand, setExpand] = useState(false)
    const navigation = useNavigation()
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };
    useEffect(() => {
        getLeaveRequest()
    }, [])
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

    const getLeaveRequest = async () => {
        let data = {
            employee: loggedInUser?.id
        }
        let response = await LeaveRequestService.get(data)
        setLeaveData(response.data)
    }

    const handleTextChange = (text) => {
        setTyping(text.length > 0);
        if (text.length == 0) {
            setCollapsed(false)
        } else {
            setCollapsed(true)

        }
    };

    const shortItems = (
        <View style={styles.chatcard}>
            <View style={styles.item}>
                <Text style={styles.itemText}>From</Text>
                <Text style={styles.itemText}>14 - Dec - 2021</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>To</Text>
                <Text style={styles.itemText}>14 - Dec - 2021</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>Leave type</Text>
                <Text style={styles.itemText}>Casual</Text>
            </View>
        </View>
    )

    const expandItems = (
        <View style={[styles.card, { elevation: isClosing ? 0 : 5, height: 400, marginTop: 10, width: '90%', justifyContent: 'center' }]}>
            <View style={styles.item}>
                <Text style={styles.itemText}>Applied</Text>
                <Text style={styles.itemText}>14 - Dec - 2021</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>From</Text>
                <Text style={styles.itemText}>14 - Nov - 2021</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>To </Text>
                <Text style={styles.itemText}>18 - Nov - 2021</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>Leave type </Text>
                <Text style={styles.itemText}>Casual</Text>
            </View>
            <View style={{ marginLeft: 20, paddingTop: 20, }}>
                <Text style={styles.itemText}>Reason</Text>

            </View>
            <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Casual Leave</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <ApprovedButton width={'90%'} />

            </View>
        </View>
    )
    return (
        <Layout title={'My Leaves'} backButton={isChating} backPress={() => setIsChating(false)}>
            {isChating ? (
                <ChattingScreen shortItems={shortItems} expandItems={expandItems} />
            ) : (
                <>
                    <View style={{ backgroundColor: '#f7f7f7', flex: 0.9 }}>
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
                                    <View key={index} style={[styles.card, { elevation: isClosing ? 0 : 5, marginBottom: 20 }]}>
                                        <View style={{ marginTop: 3 }}>
                                            <View style={styles.item}>
                                                <Text style={styles.itemText}>Applied</Text>
                                                <Text style={styles.itemText}>{formatDate(new Date(item?.created_at))}</Text>
                                            </View>
                                            <View style={styles.item}>
                                                <Text style={styles.itemText}>From</Text>
                                                <Text style={styles.itemText}>{item?.from_date}</Text>
                                            </View>
                                            <View style={styles.item}>
                                                <Text style={styles.itemText}>To </Text>
                                                <Text style={styles.itemText}>{item?.to_date}</Text>
                                            </View>
                                            <View style={styles.item}>
                                                <Text style={styles.itemText}>Leave type </Text>
                                                <Text style={styles.itemText}>Casual</Text>
                                            </View>
                                            <View style={{ marginLeft: 20, paddingTop: 20, }}>
                                                <Text style={styles.itemText}>Reason</Text>

                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>{item?.reason}</Text>
                                            </View>
                                            <StatusChat setIsChating={setIsChating} />
                                        </View>
                                    </View>
                                ))}

                            </View>
                        </ScrollView>

                        {isDrawerVisible && (
                            <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
                        )}
                    </View>
                    <View style={{ flex: 0.13, backgroundColor: '#f7f7f7' }}>
                        <BlackButton onPress={() => navigation.navigate('ApplyLeave')} title={'Apply For Leave'} />
                    </View>
                </>
            )}

        </Layout>
    )

}
export default MyLeaves
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 395,
        width: '85%',
        borderRadius: 12,
        elevation: 5,

    },
    chatcard: {
        backgroundColor: '#fff',
        height: 175,
        width: '85%',
        borderRadius: 12,
        elevation: 5,
        marginTop: 10

    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingTop: 20,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    itemText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    }
})