import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import Layout from "../../components/layout";


const ChangeShift = () => {
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
        <Layout title={'My Shifts'}>
            <View style={{ flex: 0.9, backgroundColor: '#f7f7f7' }}>
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
                )}
                <View style={{ backgroundColor: '#f7f7f7' }}>
                    
                    <View style={{ alignItems: 'center', paddingTop: 20 }}>

                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied on</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From Date</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Nov - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To Date</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>18 - Nov - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 10, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>New Shift</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
                            </View>
                            <View style={{ marginLeft: 20, paddingTop: 10, }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                            </View>
                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Reason</Text>
                            </View>
                            <TouchableOpacity onPress={toggleDrawer} style={{ width: '40%', height: 40, backgroundColor: 'black', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins-Light' }}>Approved</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                
            </View>
            <View style={{ flex: 0.1, borderTopWidth: 1, borderTopColor: 'lightgrey' }}>
                    <View style={{ position: 'absolute', bottom: 5, width: '95%', justifyContent: 'center', alignItems: 'center', left: 5 }}>
                        <TouchableOpacity style={{ width: '100%', height: 40, backgroundColor: 'black', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Light' }}>Change Shift</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Layout>
    )

}
export default ChangeShift
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: '84.5%',
        width: '85%',
        borderRadius: 12,
        elevation: 5,

    }
})