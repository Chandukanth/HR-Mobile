import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { View, Text, StyleSheet, Image, Dimensions, BackHandler } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "../../components/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import Absent from "../../../assets/days/absent.png"
import present from "../../../assets/days/present.png"
import StatusChat from "../../components/Ui/statusChat";
import DateFilter from "../../components/DateFilter";
import ChattingScreen from "../../components/Ui/chattingScreen";
import ApprovedButton from "../../components/buttons/ApprovedButton";


const AttendanceRequestDetail = (props) => {
    let params = props?.route?.params
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const navigation = useNavigation()
    const [isChating, setIsChating] = useState(false)
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
        <View style={{ alignItems: 'center', paddingTop: 20, width: '100%' }}>

            <View style={[styles.card, { height: 170 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>For Date</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Current Status</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Absent</Text>
                    <Image style={{ width: 25, height: 25, marginRight: 30 }} source={Absent} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Change to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Present</Text>
                    <Image style={{ width: 25, height: 25, marginRight: 30 }} source={present} />
                </View>


            </View>
        </View>
    )

    const expandItems = (
        <View style={{ alignItems: 'center', paddingTop: 20, width: '100%' }}>

            <View style={[styles.card, {height : screenHeight * 0.46}]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>For Date</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Current Status</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Absent</Text>
                    <Image style={{ width: 25, height: 25, marginRight: 30 }} source={Absent} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Change to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Present</Text>
                    <Image style={{ width: 25, height: 25, marginRight: 30 }} source={present} />
                </View>
                <View style={{ marginLeft: 20, paddingTop: 20, }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                </View>
                <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Forgot_to_punch</Text>
                </View>
                <ApprovedButton width={'90%'}/>

            </View>
        </View>
    )

    return (
        <Layout title={'Attendance Requests'} backButton={isChating} backPress={() => setIsChating(false)}>
            {isChating ? (
                <ChattingScreen shortItems={shortItems} expandItems={expandItems} />
            ) : (
                <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
                    <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                            <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                            <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2019</Text>
                            <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-SemiBold' }}>{params?.name}</Text>
                        </View>

                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', paddingTop: 20 }}>

                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>For Date</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Current Status</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Absent</Text>
                                <Image style={{ width: 25, height: 25, marginRight: 30 }} source={Absent} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Change to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Present</Text>
                                <Image style={{ width: 25, height: 25, marginRight: 30 }} source={present} />
                            </View>
                            <View style={{ marginLeft: 20, paddingTop: 20, }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                            </View>
                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Forgot_to_punch</Text>
                            </View>
                            <StatusChat setIsChating={setIsChating} />

                        </View>
                    </View>
                    {isDrawerVisible && (
                        <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
                    )}
                </View>
            )}

        </Layout>
    )
}
export default AttendanceRequestDetail
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: '70%',
        width: '85%',
        borderRadius: 12,
        elevation: 5,

    }
})