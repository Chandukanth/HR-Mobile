import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "./BottomSheet";
import AttendanceService from "../Services/AttendanceService";

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getMonthDays = (year, month) => {
    const totalDays = daysInMonth(year, month);
    return Array.from({ length: totalDays }, (_, index) => index + 1);
};

const getDaysOfWeek = () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getMonthName = (month) => {
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];
    return monthNames[month];
};

const Calender = ({ footer, shift, data }) => {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    useEffect(() => {
        setTimeout(async () => {
            setIsLoading(false);
        }, 1000)
    }, [])

    const years = [
        ...Array.from({ length: 2100 - 2012 + 1 }, (_, index) => 2012 + index),
    ];
    const navigation = useNavigation()
    const handlePrevYear = () => {
        setSelectedYear((prevYear) => prevYear - 1);
    };

    const handleNextYear = (value) => {
        setSelectedYear((prevYear) => prevYear + 1);
    };

    const yearMonths = Array.from({ length: 12 }, (_, month) => {
        const monthDays = getMonthDays(selectedYear, month);
        const firstDay = new Date(selectedYear, month, 1).getDay();

        // Calculate the last day of the previous month
        const lastDayOfPrevMonth = new Date(selectedYear, month, 0).getDate();
        const emptyDays = Array.from(
            { length: firstDay },
            (_, index) => lastDayOfPrevMonth - index
        ).reverse();
        return {
            month: getMonthName(month),
            days: [...emptyDays, ...monthDays],
        };
    });

    const detailsSelect = (month) => {
        navigation.navigate("AttendanceDetail", { month })
    }

    if (isLoading) {
        return (
            <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        )
    }



    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                : (
                    <>
                        <FlatList
                            pagingEnabled
                            showsHorizontalScrollIndicator={true}
                            data={yearMonths}
                            style={{ flex: 0.7 }}
                            refreshing={setIsLoading}
                            keyExtractor={(item) => item.month}
                            renderItem={({ item }) => (

                                <View style={{ flex: footer ? 0.8 : 1, justifyContent: 'center', padding: 10, maxHeight: '100%', backgroundColor: '#fff' }}>
                                    {/* Month Name */}
                                    <Text onPress={() => detailsSelect(item.month)} style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 18, textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>{item.month} - <Text onPress={toggleDrawer}>{selectedYear}</Text></Text>

                                    {/* Week Days */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                                        {daysOfWeek.map((day) => (
                                            <View key={day} style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'Poppins-Regular' }}>{day}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Month Days */}
                                    <FlatList
                                        data={item.days} // Days of the month
                                        keyExtractor={(day) => (day ? day.toString() : 'empty')}
                                        renderItem={({ item: day }) => (
                                            <TouchableOpacity
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    margin: 5,
                                                    marginBottom: 20
                                                }}
                                                onPress={() => navigation.navigate("AttendanceDetail", { month: item.month, present: true, day })}
                                            >

                                                {day !== null && <Text>{day}</Text>}
                                                {data && day !== null ? (
                                                    <>
                                                        {data}
                                                    </>
                                                ) : (
                                                    <>
                                                        {day !== null && < Image style={{ width: 20, height: 20, marginTop: 3, opacity: 0.5 }} source={require("../../assets/days/notassigned.png")} />}
                                                    </>
                                                )}




                                            </TouchableOpacity>
                                        )}
                                        numColumns={7} // Number of columns in the calendar
                                    />
                                </View>

                            )}
                        />
                        {footer && (
                            <View style={{ backgroundColor: '#fff', flex: 0.23 }}>
                                {footer}
                            </View>
                        )}
                    </>
                )}




            {isDrawerVisible && (
                <BottomSheet isModalVisible={isDrawerVisible} setModalVisible={setDrawerVisible} toggleModal={toggleDrawer} >

                    <View style={{ flex: 1, flexDirection: "row", paddingTop: 20, justifyContent: 'space-evenly' }}>

                        <View style={{ width: '100%', }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 16, }}>Year</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginHorizontal: 65, paddingTop: 10 }} />

                                {years.map((item, index) => (
                                    <TouchableOpacity onPress={() => {
                                        setSelectedYear(item)
                                        toggleDrawer()
                                    }} key={index} style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey', marginHorizontal: 65 }}>
                                        <Text style={{ textAlign: 'left', fontFamily: 'Poppins-Medium' }}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                    </View>


                </BottomSheet>
            )}

        </View>
    );
};

export default Calender;
