import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { BackHandler, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import Layout from "../../components/layout";
import BlackButton from "../../components/blackButton";
import DateFilter from "../../components/DateFilter";
import StatusChat from "../../components/Ui/statusChat";
import ChattingScreen from "../../components/Ui/chattingScreen";
import ApprovedButton from "../../components/buttons/ApprovedButton";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ChangeShift = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isChating, setIsChating] = useState(false)
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    useEffect(() => {
        if (isChating) {
            const backAction = () => {
                setIsChating(false)
                return true;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

            return () => {
                backHandler.remove();
            };
        }

    }, [isChating]);

    const shortItems = (
        <View style={[styles.card, { height: 170 }]}>
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


        </View>
    )

    const expandItems = (
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
            <ApprovedButton width={'90%'} />
        </View>
    )

    return (
        <Layout title={'My Shifts'} backButton={isChating} backPress={() => setIsChating(false)}>

            {isChating ? (
                <ChattingScreen shortItems={shortItems} expandItems={expandItems} />
            ) : (
                <>
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
                            <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
                        )}
                        <View style={{ backgroundColor: '#f7f7f7' }}>

                            <View style={{ alignItems: 'center', paddingTop: 20 }}>

                                <View style={styles.card}>
                                    <View style={{marginTop : 6}}>
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
                                        <StatusChat setIsChating={setIsChating} />
                                    </View>


                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ flex: 0.13, backgroundColor:'#f7f7f7' }}>
                        <View style={{ position: 'absolute', bottom: 18, width: '95%', justifyContent: 'center', left: 5 }}>
                            <BlackButton title={'Change Shift'} />
                        </View>
                    </View>
                </>
            )}

        </Layout>
    )

}
export default ChangeShift
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: screenHeight * 0.51,
        width: '85%',
        borderRadius: 12,
        elevation: 5,

    }
})