import React, { useState } from "react";
import { Text, View, FlatList, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const Calender = ({ footer }) => {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState(null)
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

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <>

            <FlatList
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                data={yearMonths}
                onEndReached={handleNextYear}
                onEndReachedThreshold={0.1}
                keyExtractor={(item) => item.month}
                renderItem={({ item }) => (

                    <View style={{ flex: footer ? 0.8 : 1, justifyContent: 'center', padding: 10, maxHeight: '100%', backgroundColor: '#fff' }}>
                        {/* Month Name */}
                        <Text onPress={() => detailsSelect(item.month)} style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>{item.month} - {selectedYear}</Text>

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
                                    onPress={() => navigation.navigate("AttendanceDetail", { month: item.month, present : true, day })}
                                >

                                    {day !== null && <Text>{day}</Text>}
                                    {day !== null && day == 2 ? <Image style={{ width: 20, height: 20, marginTop: 3 }} source={require("../../assets/days/present.png")} /> : day !== null && <Image style={{ width: 20, height: 20, marginTop: 3 }} source={require("../../assets/days/notassigned.png")} />}
                                </TouchableOpacity>
                            )}
                            numColumns={7} // Number of columns in the calendar
                        />
                    </View>

                )}
            />
            {footer && (
                <View style={{ backgroundColor: '#fff' }}>
                    {footer}
                </View>
            )}




        </>
    );
};

export default Calender;
