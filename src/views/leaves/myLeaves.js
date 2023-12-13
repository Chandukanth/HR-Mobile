import React, { useState } from "react";
import Layout from "../../components/layout";
import { View, Text, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "../../components/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import BlackButton from "../../components/blackButton";
import Absent from "../../../assets/days/absent.png"
import present from "../../../assets/days/present.png"
import { isClosingState } from "../../lib/atom";
import { useRecoilState } from "recoil";
import Chat from "../../../assets/new.png"
import Avatar from "../../../assets/avatar/avatar2.png"
import Collapsible from 'react-native-collapsible';


const MyLeaves = () => {
    const [isClosing, setIsClosing] = useRecoilState(isClosingState);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isChating, setIsChating] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isCollapsed, setCollapsed] = useState(false)
    const [expand, setExpand] = useState(false)
    const navigation = useNavigation()
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };
    const years = [
        ...Array.from({ length: 2100 - 2012 + 1 }, (_, index) => 2012 + index),
    ];
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];
    const handleTextChange = (text) => {
        // Check if there is any text to determine if the user is typing
        setTyping(text.length > 0);
        if (text.length == 0) {
            setCollapsed(false)
        } else {
            setCollapsed(true)

        }
        // You can also do other things with the text if needed
    };
    return (
        <Layout title={'My Leaves'} backButton={isChating} backPress={() => setIsChating(false)}>
            {isChating ? (
                <View style={{ backgroundColor: '#f7f7f7', flex: 1, alignItems: 'center' }}>
                    {!expand ? (
                        <TouchableOpacity onPress={() => setExpand(true)} style={styles.chatcard}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Leave type</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => setExpand(false)} style={[styles.card, { elevation: isClosing ? 0 : 5, height: 400, marginTop: 10 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Nov - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To </Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>18 - Nov - 2021</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Leave type </Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
                            </View>
                            <View style={{ marginLeft: 20, paddingTop: 20, }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                            </View>
                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Casual Leave</Text>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={toggleDrawer} style={{ width: '90%', height: 40, backgroundColor: '#DAECE2', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>
                                    <Text style={{ color: '#48a272', fontFamily: 'Poppins-SemiBold' }}>Approved</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableOpacity>
                    )}



                    <View style={{ width: '90%', position: 'absolute', bottom: 10, flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                        {!isCollapsed && (
                            <>
                                <View style={{ marginRight: 5, width: 40, height: 40, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={Avatar} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ marginRight: 5, width: 40, height: 40, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="plus" size={14} />
                                </View>
                            </>
                        )}

                        {typing && isCollapsed && (
                            <TouchableOpacity onPress={toggleCollapse}>
                                <MaterialCommunityIcons name="chevron-right" size={24} />

                            </TouchableOpacity>
                        )}

                        <View style={{ width: !typing && !isCollapsed ? '73%' : !isCollapsed ? '60%' : '78%', height: 40, backgroundColor: '#fff', borderRadius: 16, }}>
                            <View style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                                <View style={{ marginTop: 5, }}>
                                    <TextInput
                                        placeholder="Post a Comment"
                                        onChangeText={handleTextChange}
                                    />
                                </View>

                            </View>
                        </View>
                        {typing && (
                            <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'black', borderRadius: 25, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <MaterialCommunityIcons name="send" color={'#fff'} size={14} />

                            </TouchableOpacity>
                        )}

                    </View>

                </View>
            ) : (
                <>

                    {isDrawerVisible && (
                        <BottomSheet isModalVisible={isDrawerVisible} setModalVisible={setDrawerVisible} toggleModal={toggleDrawer} >

                            <View style={{ flex: 0.70, flexDirection: "row", paddingTop: 20, justifyContent: 'space-evenly' }}>
                                <View style={{ width: '50%', }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {monthNames.map((item) => (
                                            <View style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey' }}>
                                                <Text style={{ textAlign: 'left' }}>{item}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                                <View style={{ width: '50%', }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {years.map((item) => (
                                            <View style={{ height: 60, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'lightgrey' }}>
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

                    <View style={{ backgroundColor: '#f7f7f7', flex: 0.9 }}>
                        <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                                <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                                <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2021</Text>
                            </View>
                            <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                                <Foundation name="filter" size={24} color="black" />

                            </View>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', paddingTop: 20 }}>

                            <View style={[styles.card, { elevation: isClosing ? 0 : 5 }]}>
                                <View style={{marginTop : 3}}>

                               
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Applied</Text>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Dec - 2021</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>From</Text>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>14 - Nov - 2021</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>To </Text>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>18 - Nov - 2021</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 20, height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Leave type </Text>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Casual</Text>
                                </View>
                                <View style={{ marginLeft: 20, paddingTop: 20, }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Reason</Text>

                                </View>
                                <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50, borderRadius: 6, width: '90%', marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginLeft: 10 }}>Casual Leave</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row',  alignItems: 'center' }}>
                                    <TouchableOpacity onPress={toggleDrawer} style={{ width: '73%', height: 40, backgroundColor: '#DAECE2', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>
                                        <Text style={{ color: '#48a272', fontFamily: 'Poppins-SemiBold' }}>Approved</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setIsChating(true)} style={{ height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 10, width: 40, backgroundColor: '#f7f7f7', borderRadius : 8, marginLeft : 10 }}>
                                        <Image style={{ width: 30, height: 30, marginTop: 5 }} source={Chat} />
                                    </TouchableOpacity>

                                </View>


                            </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.13,  borderTopColor: 'lightgrey',  justifyContent:'center' }}>
                        
                            <BlackButton title={'Apply For Leave'} />
                       
                    </View>
                </>
            )}

        </Layout>
    )

}
export default MyLeaves
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: '81%',
        width: '85%',
        borderRadius: 12,
        elevation: 5,

    },
    chatcard: {
        backgroundColor: '#fff',
        height: 175,
        width: '85%',
        borderRadius: 12,
        elevation: 5,
        marginTop: 10

    }
})