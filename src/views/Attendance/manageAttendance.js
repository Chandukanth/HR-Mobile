import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { BackHandler, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import BottomSheet from "../../components/BottomSheet";
import BlackButton from "../../components/blackButton";
import Layout from "../../components/layout";
import DateFilter from "../../components/DateFilter";
import absent from "../../../assets/days/absent.png"
import Present from "../../../assets/days/present.png"
import compOff from "../../../assets/days/compoff.png"
import leave from "../../../assets/days/leave.png"
import weekoff from "../../../assets/days/weekoff.png"
import notassigned from "../../../assets/days/notassigned.png"
import { screenHeight } from "../../lib/heightwidth";
import StatusChat from "../../components/Ui/statusChat";
import ChattingScreen from "../../components/Ui/chattingScreen";
import ApprovedButton from "../../components/buttons/ApprovedButton";
import AttendnaceChangeRequestService from "../../Services/AttendanceChangeRequestService";
import AttendanceService from "../../Services/AttendanceService";
import { useRecoilState } from "recoil";
import { User, activeTab, company } from "../../lib/atom";
import { AttendanceChangeRequestReasonChoices, ReverseAttendanceChangeRequestReasonChoices, attendanceId, generateAttendanceElement } from "../../lib/AttendanceElements";
import { formatDate, getCurrentMonthEndDate, getCurrentMonthStartDate, getMonthNumber } from "../../lib/Datetime";
import RejectedButton from "../../components/buttons/RejectedButton";
import PendingButton from "../../components/buttons/PendingButton";
import ChatButton from "../../components/buttons/ChatButton";



const FirstRoute = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [attendanceList, setAttendanceList] = useState([])
    const [isChangeModal, setIsChangeModal] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedReason, setSelectedReason] = useState(null)
    const [selectStatus, setSelectStatus] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedReasonItem, setSelectedReasonItem] = useState(null)
    const [otherReasons, setOtherReasons] = useState("");
    const [selecteduser, setSelectedUser] = useRecoilState(User)
    const [companyId, setCompanyId] = useRecoilState(company);
    const [currentStatus, setCurrentStatus] = useState(null)
    const [index, setIndex] = useRecoilState(activeTab);
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")

    useEffect(() => {
        getAttendanceList()
    }, [year])

    const handlePress = (i) => {
        if (i) {
            setSelectedReasonItem(i)
        }
        setIsPopoverOpen(!isPopoverOpen);
    };

    const SubmitRequest = async () => {
        const currentDate = new Date();
        const currentMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const formattedStartDate = `${currentMonthStartDate.getFullYear()}-${(currentMonthStartDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedItem?.changeto.toString().padStart(2, '0')}`;

        let data = {
            company: companyId[0].id,
            from_date: formattedStartDate,
            to_date: formattedStartDate,
            status: '0',
            from_status: currentStatus,
            to_status: attendanceId(selectStatus?.name),
            reason: AttendanceChangeRequestReasonChoices(selectedReason),
            employee: selecteduser?.id,

        }
        let response = await AttendnaceChangeRequestService.post(data)
        console.log("🚀 ~ file: manageAttendance.js:67 ~ SubmitRequest ~ data:", response)
        setIndex(1)
    }

    const getAttendanceList = async () => {
        const currentDate = new Date();
        const currentMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Format the date if needed
        const formattedStartDate = `${currentMonthStartDate.getFullYear()}-${(currentMonthStartDate.getMonth() + 1).toString().padStart(2, '0')}-${currentMonthStartDate.getDate().toString().padStart(2, '0')}`;
        let data = {
            timestamp__date_gte: year ? `${year}-${getMonthNumber(month)}-01` : formattedStartDate,
            employee: selecteduser?.id,
        }
        let response = await AttendanceService.get(data);
        setAttendanceList(response.data)
    }

    const toggleChangeModal = (i, status) => {
        if (i) {
            let data = {
                changeto: i
            }
            setSelectedItem(data)
        }

        if (status) {
            setCurrentStatus(status)
        }

        setIsChangeModal(!isChangeModal)
    }

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    const selectedStatus = (item, name) => {
        let status = {
            image: item,
            name: name
        }
        setSelectStatus(status)
        setIsChangeModal(false)
    }

    const changeStatus = [
        { name: 'Present', image: Present },
        { name: 'Leave', image: leave },
        { name: 'Absent', image: absent },
        { name: 'Comp Off', image: compOff },
        { name: 'Week Off', image: weekoff },
        { name: 'Holiday', image: notassigned },
    ]

    const Reason = [
        { name: 'Forgot to Punch', icon: 'FP' },
        { name: 'Out for Work', icon: 'OW' },
        { name: 'Others', icon: 'OT' },

    ]
    return (
        <>
            <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, backgroundColor: '#f7f7f7', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                    <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                    <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>{month} {year}</Text>
                </View>
                <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                    <Foundation name="filter" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <View style={{
                width: "85%",
                height: 60,
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 30
            }}>
                <Text style={[styles.title, { marginRight: 15 }]}>Date</Text>
                <Text style={styles.title}>Current</Text>
                <Text style={styles.title}>Change to</Text>
                <Text style={styles.title}>Reason</Text>


            </View>
            <ScrollView>
                <View>
                    {renderNumberList(toggleChangeModal, handlePress, selectStatus, selectedItem, selectedReason, selectedReasonItem, attendanceList)}
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
                <BlackButton onPress={SubmitRequest} disabled={selectStatus ? false : true} title={'Submit'} />

            </View>
            <DateFilter setMonth={setMonth} setYear={setYear} isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
            {isChangeModal && (
                <BottomSheet isModalVisible={isChangeModal} setModalVisible={setIsChangeModal} toggleModal={toggleChangeModal}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 16, paddingTop: 20 }}>Change to</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginHorizontal: 65, paddingTop: 10 }} />

                    {changeStatus.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => selectedStatus(item.image, item.name)} style={{ flexDirection: 'row', alignItems: 'center', height: 60, borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginHorizontal: 65, }}>
                            <View style={{ flexDirection: 'row', marginLeft: '28%', alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 30, objectFit: 'contain', marginRight: 20 }} source={item.image} />
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </BottomSheet>
            )}
            {isPopoverOpen && (
                <BottomSheet height={"20%"} isModalVisible={isPopoverOpen} setModalVisible={setIsPopoverOpen} toggleModal={handlePress} >
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 16, paddingTop: 20 }}>{selectedReason == 'Others' ? 'Type Reason' : 'Reason'}</Text>
                    <View style={{ height: 200 }}>
                        <ScrollView>

                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginHorizontal: 65, paddingTop: 10 }} />
                            {selectedReason !== 'Others' && (
                                <>
                                    {Reason.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => {
                                            if (item.name !== 'Others') {
                                                handlePress()
                                            }

                                            setSelectedReason(item.name)

                                        }} style={{ flexDirection: 'row', alignItems: 'center', height: 60, borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginHorizontal: 65, backgroundColor: selectedReason == item.name ? '#f7f7f7' : '#fff' }}>
                                            <View style={{ flexDirection: 'row', marginLeft: '15%', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', marginRight: 20 }} >{item.icon}</Text>
                                                <Text style={{ fontFamily: 'Poppins-Regular' }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </>
                            )}

                            {selectedReason == 'Others' && (
                                <View style={styles.reasonContainer}>
                                    <TextInput
                                        style={styles.textinput}
                                        multiline
                                        numberOfLines={10}
                                        placeholder="Write a reason here"
                                        onChangeText={setOtherReasons}
                                    />

                                </View>
                            )}

                        </ScrollView>
                        {selectedReason == 'Others' && (
                            <BlackButton onPress={() => handlePress("")} title={'Submit'} />
                        )}
                    </View>
                </BottomSheet>
            )}
        </>
    )
}

const SecondRoute = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isChating, setIsChating] = useState(false)
    const [index, setIndex] = useRecoilState(activeTab);
    const [attendanceDetails, setAttendanceDetails] = useState([])
    const [selecteduser, setSelectedUser] = useRecoilState(User);
    const [fromDate, setFromDate] = useState(getCurrentMonthStartDate())
    console.log("🚀 ~ file: manageAttendance.js:245 ~ SecondRoute ~ fromDate:", fromDate)
    const [toDate, setToDate] = useState(getCurrentMonthEndDate())
    console.log("🚀 ~ file: manageAttendance.js:247 ~ SecondRoute ~ toDate:", toDate)


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
        if (index == 1) {
            getAttendanceChangeRequest()

        }
    }, [index])


    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
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
        <View style={[styles.card, { height: 400, marginTop: 10, width: '90%', justifyContent: 'center' }]}>
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

    const getAttendanceChangeRequest = async () => {
        let params = {
            employee: selecteduser?.id,
            // from_date : fromDate,
        }
        let response = await AttendnaceChangeRequestService.get(params)
        setAttendanceDetails(response.data)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            {isChating ? (
                <ChattingScreen shortItems={shortItems} expandItems={expandItems} />
            ) : (
                <>
                    <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                            <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                            <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2023</Text>
                        </View>
                        <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                            <Foundation name="filter" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <ScrollView >
                        <View style={{ alignItems: 'center', paddingTop: 10 }}>

                            {attendanceDetails && attendanceDetails.length > 0 && attendanceDetails.map((item, index) => (
                                <View key={index} style={[styles.card, { marginBottom: 10 }]}>
                                    <View style={{ marginTop: 3 }}>
                                        <View style={styles.item}>
                                            <Text style={styles.itemText}>For date</Text>
                                            <Text style={styles.itemText}>{item?.to_date}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemText}>Current status</Text>
                                            <Image style={{ width: 20, height: 20 }} source={generateAttendanceElement(item?.from_status)} />
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemText}>Change to </Text>
                                            <Image style={{ width: 20, height: 20 }} source={generateAttendanceElement(item?.to_status == 0 ? item?.to_status.toString() : item?.to_status)} />
                                        </View>

                                        <View style={{ marginLeft: 20, paddingTop: 20, }}>
                                            <Text style={styles.itemText}>Reason</Text>

                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>{ReverseAttendanceChangeRequestReasonChoices(item?.reason == 0 ? item?.reason.toString() : item?.reason)}</Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                            {item.status == 0 && (
                                                <PendingButton />
                                            )}

                                            {item.status == 1 && (
                                                <ApprovedButton />

                                            )}
                                            {item.status == 2 && (
                                                <RejectedButton />

                                            )}
                                            <ChatButton onPress={() => setIsChating(true)} />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>




                    {isDrawerVisible && (
                        <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
                    )}
                </>
            )}

        </View>
    );
}

const renderNumberList = (toggleChangeModal, handlePress, selectStatus, selectedItem, selectedReason, selectedReasonItem, attendanceList) => {

    const numberList = [];
    for (let i = 1; i <= 31; i++) {
        const backgroundColor = i % 2 === 0 ? "#fff" : "#f5f5f5";
        const formattedNumber = i < 10 ? `0${i}` : `${i}`;

        // Find attendance data for the current day
        const dayAttendance = attendanceList.find(item => item.date === `2023-12-${formattedNumber}`);

        numberList.push(
            <View key={i} style={{ width: '100%', backgroundColor, height: 60, }}>
                <View
                    key={i}
                    style={{
                        width: "90%",
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ opacity: 0.7, paddingLeft: 40 }}>{formattedNumber}</Text>
                    {dayAttendance ? (
                        // Display content based on attendance data
                        <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={generateAttendanceElement(dayAttendance?.computed_status)} />
                    ) : (
                        // Default content when no attendance data is found
                        <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../../../assets/days/notassigned.png')} />
                    )}
                    <TouchableOpacity disabled={dayAttendance ? false : true} key={i} onPress={() => toggleChangeModal(i, dayAttendance?.computed_status.toString())} style={{ width: 30, backgroundColor: backgroundColor, opacity: dayAttendance ? 1 : 0.5 }}>
                        {selectStatus && selectedItem.changeto == i ? (
                            <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={selectStatus.image} />
                        ) : (
                            <MaterialCommunityIcons name="chevron-down" size={24} color="black" />

                        )}
                    </TouchableOpacity>
                    <TouchableOpacity disabled={dayAttendance ? false : true} onPress={() => handlePress(i)} style={{ backgroundColor: backgroundColor, opacity: dayAttendance ? 1 : 0.5 }}>
                        {selectedReason && selectedReasonItem == i ? (
                            <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{selectedReason == 'Out for Work' ? 'OW' : selectedReason == 'Forgot to Punch' ? 'FP' : 'OT'}</Text>
                        ) : (
                            <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
                        )}

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return numberList;
};


const ManageAttendance = () => {
    const [index, setIndex] = useRecoilState(activeTab);
    const [routes] = useState([
        { key: "first", title: "MANAGE" },
        { key: "second", title: "MY REQUESTS" },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const tabView = (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: "black" }}
                    style={{ backgroundColor: "white" }}
                    labelStyle={{ color: "black" }}
                />
            )}
        />
    )

    return (
        <Layout edgeHitWidth={index == 1 ? 100 : 300} title={'Manage Attendance'} noChildren={true} tabView={tabView}>

        </Layout>
    );
};

export default ManageAttendance;
const styles = StyleSheet.create({
    title: {
        fontFamily: 'Poppins-SemiBold'
    },

    reasonContainer: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        width: '90%',
        height: 150,
        backgroundColor: '#f7f7f7',
        padding: 20
    },
    card: {
        backgroundColor: '#fff',
        height: 345,
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
