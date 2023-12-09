import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import Present from "../../assets/days/present.png"
import leave from "../../assets/days/leave.png"
import compoff from "../../assets/days/compoff.png"
import weekoff from "../../assets/days/weekoff.png"
import notassigned from "../../assets/days/notassigned.png"
import Layout from './layout';

const { width: screenWidth } = Dimensions.get('window');

const AttendanceDetail = (props) => {
    let params = props.route.params
    const navigation = useNavigation();
    const details = [
        { image: Present, name: "Present", number: 0 },
        { image: leave, name: "Leave", number: 0 },
        { image: weekoff, name: "Week Off", number: 0 },
        { image: compoff, name: "Comp Off", number: 0 },
        { image: notassigned, name: "Half Day", number: 0 },
        { image: notassigned, name: "Days Left", number: 2 },
        { image: notassigned, name: "Total Days", number: 31 },
        { image: notassigned, name: "Comp Off", number: 4 },
        { image: notassigned, name: "Overtime", number: 6 },

    ]

    const attendance = [
        { name: 'Attendance Status', image: Present },
        { name: 'Checkin Time', number: '9:00 AM' },
        { name: 'Checkout Time', number: '4:00 PM' },
        { name: 'Location', number: 'MG Road' },

    ]
    return (
        <Layout backButton title={`My Attendance`}>
            <View style={{ backgroundColor: '#f7f7f7', flex: 1, width: screenWidth }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', paddingTop: 20, paddingBottom: 20 }}>{`Attendence Overview - ${params?.day ? params?.day : ''} ${params?.month} 23`}</Text>
                {params?.present ? (
                    <>
                        {attendance.map((item, index) => (
                            <View key={index} style={{ backgroundColor: '#f7f7f7' }}>
                                <View key={index} style={[styles.menuContainer, { height: 80 }]}>
                                    <Text style={{ fontFamily: 'Poppins-Light', marginLeft: 30 }}>{item.name}</Text>
                                    {item.number && <View style={{width : 100, height : 40, borderRadius : 8, backgroundColor : '#f7f7f7', justifyContent : 'center', alignItems:'center', marginRight: 20}}>
                                    {<Text style={{  fontFamily: 'Poppins-Medium' }}>{item.number}</Text>}

                                    </View>}
                                    {item.image && <Image style={{ width: 25, height: 25, marginRight: 30 }} source={item.image} />}

                                </View>
                            </View>
                        ))}
                    </>
                ) : (
                    <>
                        {details.map((item, index) => (
                            <View key={index} style={{ backgroundColor: '#f7f7f7' }}>
                                <View key={index} style={[styles.menuContainer,]}>
                                    <Image style={{ width: 25, height: 25, marginLeft: 60 }} source={item.image} />
                                    <Text style={{ fontFamily: 'Poppins-Light' }}>{item.name}</Text>
                                    <Text style={{ marginRight: 60, fontFamily: 'Poppins-Light' }}>{item.number}</Text>

                                </View>
                            </View>
                        ))}
                    </>
                )}



            </View>
        </Layout>

    );
};

export default AttendanceDetail;
const styles = StyleSheet.create({
    menuContainer: {
        borderRadius: 6,
        backgroundColor: '#fff',
        width: screenWidth - 50,
        height: 60,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 25
    },
});