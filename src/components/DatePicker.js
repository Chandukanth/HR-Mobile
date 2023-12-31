import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({ isDatePickerVisible, setDatePickerVisibility, setSelectedDate, selectedDate, setDate, date }) => {

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const handleConfirm = (date) => {
        setDate && setDate(date)
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        setSelectedDate && setSelectedDate(formattedDate)
        hideDatePicker();
       
    };

    return (
        <View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                isDarkModeEnabled={true}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default DatePicker;