import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BlackButton from "./blackButton";
import { getMonthNumber } from "../lib/Datetime";

const DateFilter = ({ isDrawerVisible, setDrawerVisible, toggleDrawer, setYear, setMonth, selectedDate }) => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null)
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];

    const years = [
        ...Array.from({ length: 2100 - 2012 + 1 }, (_, index) => 2012 + index),
    ];

    const submitDetail = () => {
        setYear && setYear(selectedYear)
        setMonth && setMonth(selectedMonth)
        selectedDate && selectedDate(`${selectedYear}-${getMonthNumber(selectedMonth)}-01`)
        toggleDrawer()
    }
    return (
        <BottomSheet isModalVisible={isDrawerVisible} setModalVisible={setDrawerVisible} toggleModal={toggleDrawer} >

            <View style={{ flex: 0.70, flexDirection: "row", paddingTop: 20, justifyContent: 'space-evenly' }}>
                <View style={{ width: '50%', }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {monthNames.map((item, index) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedMonth(item)
                                setMonth && setMonth(item)
                            }} key={index} style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey', backgroundColor: selectedMonth == item ? '#f7f7f7' : '#fff' }}>
                                <Text style={{ textAlign: 'left' }}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ width: '50%', }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {years.map((item, index) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedYear(item)
                                setYear && setYear(item)
                            }} key={index} style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey', backgroundColor: selectedYear == item ? '#f7f7f7' : '#fff' }}>
                                <Text style={{ textAlign: 'left' }}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 10, width: '100%', justifyContent: 'center', left: 5 }}>
                <BlackButton title={'Submit'} onPress={submitDetail} />
            </View>
        </BottomSheet>
    )
}
export default DateFilter