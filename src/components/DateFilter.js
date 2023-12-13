import React from "react";
import BottomSheet from "./BottomSheet";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const DateFilter = ({ isDrawerVisible, setDrawerVisible, toggleDrawer }) => {
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];

    const years = [
        ...Array.from({ length: 2100 - 2012 + 1 }, (_, index) => 2012 + index),
    ];
    return (
        <BottomSheet isModalVisible={isDrawerVisible} setModalVisible={setDrawerVisible} toggleModal={toggleDrawer} >

            <View style={{ flex: 0.70, flexDirection: "row", paddingTop: 20, justifyContent: 'space-evenly' }}>
                <View style={{ width: '50%', }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {monthNames.map((item, index) => (
                            <View key={index} style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey' }}>
                                <Text style={{ textAlign: 'left' }}>{item}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ width: '50%', }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {years.map((item, index) => (
                            <View key={index} style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey' }}>
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
    )
}
export default DateFilter