import React, { useEffect, useState } from 'react';
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
import Avatar from '../../assets/avatar/avatar2.png'
import { getEmployeeName } from '../lib/getEmployeeName';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AttendanceDetail = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getEmployeeName(params?.item?.employee).then((name) => {
            setUser(name)

        })
    }, [user])
    let params = props.route.params
    console.log("🚀 ~ file: attendanceDetail.js:27 ~ AttendanceDetail ~ params:", params)
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
        { name: 'Attendance Status', image: params?.image ? params?.image : notassigned },
        { name: 'Checkin Time', number: '9:00 AM' },
        { name: 'Checkout Time', number: '4:00 PM' },
        { name: 'Location', number: 'MG Road' },

    ]
    return (
        <Layout backButton title={`My Attendance`}>
            <View style={{ backgroundColor: '#f7f7f7', flex: 1, width: screenWidth }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', paddingTop: 20, paddingBottom: 20 }}>{`Attendence Overview - ${params?.day ? params?.day : ''} ${params?.month} 23`}</Text>
                {params?.present && params?.item ? (
                    <>
                        <View style={{ alignItems: 'center', flex: 0.4 }}>
                            <View style={{ width: 200, backgroundColor: '#fff', borderRadius: screenWidth, height: 200, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Image style={{ objectFit: 'cover', width: 150, height: 150, marginBottom: 10 }} source={Avatar} />
                            </View>
                            <Text style={{ fontFamily: 'Poppins-Bold', marginTop: 20, }}>{user}</Text>

                        </View>
                        <View style={{ flex: 0.5 }}>
                            {attendance.map((item, index) => (
                                <View key={index} style={{ backgroundColor: '#f7f7f7' }}>
                                    <View key={index} style={[styles.menuContainer, { height: 80 }]}>
                                        <Text style={{ fontFamily: 'Poppins-Light', marginLeft: 30 }}>{item.name}</Text>
                                        {item.number && <View style={{ width: 100, height: 40, borderRadius: 8, backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                            {<Text style={{ fontFamily: 'Poppins-Medium' }}>{item.number}</Text>}

                                        </View>}
                                        {item.image && <Image style={{ width: 25, height: 25, marginRight: 30 }} source={item.image} />}

                                    </View>
                                </View>
                            ))}
                        </View>

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
        height: screenHeight / 12.2,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 25
    },
});