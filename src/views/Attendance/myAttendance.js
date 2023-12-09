import React, { useState } from "react";
import Layout from "../../components/layout";
import { Text, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Calender from "../../components/Calender";
import { Button } from "react-native";



const MyAttendance = () => {

    const footer = (
        <View style={{ borderTopWidth: 2, borderColor: 'lightgrey' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 2, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Checked in <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- 9:30AM</Text>
                    </Text>
                </View>
                <View style={{ width: '48%', borderColor: 'lightgrey', borderWidth: 1, borderRadius: 2, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
                        Shift <Text style={{ fontFamily: 'Poppins-SemiBold' }}>- Morning</Text>
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={{ width: '95%', height: 40, backgroundColor: 'black', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'Poppins-Light' }}>Check out</Text>
            </TouchableOpacity>

        </View>


    )

    return (
        <Layout title={`My Attendance`}>
           
                <Calender footer={footer} />
            
        </Layout>
    );
};

export default MyAttendance;
