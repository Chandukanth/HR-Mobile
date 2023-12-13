import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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



const FirstRoute = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isChangeModal, setIsChangeModal] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handlePress = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const toggleChangeModal = () => {
        setIsChangeModal(!isChangeModal)
    }

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

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
                    <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2019</Text>
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
                    {renderNumberList(toggleChangeModal, handlePress)}
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
                <BlackButton title={'Submit'} />

            </View>
            <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
            {isChangeModal && (
                <BottomSheet isModalVisible={isChangeModal} setModalVisible={setIsChangeModal} toggleModal={toggleChangeModal}>
                    {changeStatus.map((item, index) => (
                        <TouchableOpacity onPress={toggleChangeModal} style={{ flexDirection: 'row', alignItems: 'center', height: 60, borderBottomWidth: 1, borderBottomColor: '#f7f7f7' }}>
                            <View style={{ flexDirection: 'row', marginLeft: '35%', alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 30, objectFit: 'contain', marginRight: 20 }} source={item.image} />
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </BottomSheet>
            )}
            {isPopoverOpen && (
                <BottomSheet height={"25%"} isModalVisible={isPopoverOpen} setModalVisible={setIsPopoverOpen} toggleModal={handlePress} >
                    {Reason.map((item, index) => (
                        <TouchableOpacity onPress={handlePress} style={{ flexDirection: 'row', alignItems: 'center', height: 60, borderBottomWidth: 1, borderBottomColor: '#f7f7f7' }}>
                            <View style={{ flexDirection: 'row', marginLeft: '35%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', marginRight: 20 }} >{item.icon}</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular' }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </BottomSheet>
            )}
        </>
    )
}

const SecondRoute = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    const years = [
        ...Array.from({ length: 2100 - 2012 + 1 }, (_, index) => 2012 + index),
    ];
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                    <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                    <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2019</Text>
                </View>
                <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                    <Foundation name="filter" size={24} color="black" />
                </View>
            </TouchableOpacity>
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
    );
}

const EmptyNumber = () => {
    const numberList = [];
    for (let i = 1; i <= 2; i++) {
        // Alternate background color
        const backgroundColor = i % 2 === 0 ? "#fff" : "#f5f5f5";

        // Add leading zero if needed
        const formattedNumber = "";

        numberList.push(
            <View
                key={i}
                style={{
                    width: "100%",
                    height: 60,
                    backgroundColor,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{ opacity: 0.7, paddingLeft: 40 }}>{formattedNumber}</Text>

            </View>
        );
    }
    return numberList;
};

const renderNumberList = (toggleChangeModal, handlePress) => {
    const numberList = [];
    for (let i = 1; i <= 31; i++) {
        // Alternate background color
        const backgroundColor = i % 2 === 0 ? "#fff" : "#f5f5f5";

        // Add leading zero if needed
        const formattedNumber = i < 10 ? `0${i}` : `${i}`;

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
                    {
                        i == 2 ?
                            <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../../../assets/days/present.png')} />
                            :
                            <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../../../assets/days/notassigned.png')} />

                    }
                    <TouchableOpacity onPress={toggleChangeModal} style={{ width: 30, backgroundColor: backgroundColor, opacity: 0.5 }}>
                        <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePress} style={{ backgroundColor: backgroundColor, opacity: 0.5 }}>
                        <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
    return numberList;
};

const ManageAttendance = () => {
    const [index, setIndex] = useState(0);
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
        <Layout title={'Manage Attendance'} noChildren={true} tabView={tabView}>

        </Layout>
    );
};

export default ManageAttendance;
const styles = StyleSheet.create({
    title: {
        fontFamily: 'Poppins-SemiBold'
    },
    popover: {
        position: 'absolute',
        top: 50, // Adjust the top position as needed
        left: 10, // Adjust the left position as needed
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
})
