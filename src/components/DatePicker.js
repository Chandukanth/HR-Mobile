import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({ isDatePickerVisible, setDatePickerVisibility, setSelectedDate }) => {

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        setSelectedDate(formattedDate)
        console.warn("A date has been picked: ", date);
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