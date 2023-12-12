import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import BottomSheet from "../../components/BottomSheet";
import BlackButton from "../../components/blackButton";
import Layout from "../../components/layout";

const FirstRoute = () => (
    <>
        {EmptyNumber()}
        <ScrollView>
            <View>
                {renderNumberList()}
            </View>
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
            <BlackButton title={'Submit'} />

        </View>
    </>
);

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

const renderNumberList = () => {
    const numberList = [];
    for (let i = 1; i <= 31; i++) {
        // Alternate background color
        const backgroundColor = i % 2 === 0 ? "#fff" : "#f5f5f5";

        // Add leading zero if needed
        const formattedNumber = i < 10 ? `0${i}` : `${i}`;

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
                {
                    i == 2 ?
                        <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../../../assets/days/present.png')} />
                        :
                        <Image style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../../../assets/days/notassigned.png')} />

                }
                <View style={{ height: 2, width: 150, backgroundColor: backgroundColor }} />
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
