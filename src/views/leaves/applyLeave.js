import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from "react-native"
import Layout from "../../components/layout"
import { AntDesign, Foundation } from "@expo/vector-icons";
import Picker from "../../components/DatePicker";
import BottomSheet from "../../components/BottomSheet";
import Calendar from "../../../assets/calender.png"


const ApplyLeave = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isBalanceModal, setIsBalanceModal] = useState(false)
    const [open, setOpen] = useState(false)
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    const balanceToggle = () => {
        setIsBalanceModal(!isBalanceModal)
    }
    const Name = ["Casual", "Sick", "Comp Off", "Holiday", "Maternity"]

    const Balance = [
        { type: 'Casual', balance: '4', total: '12' },
        { type: 'Sick', balance: '4', total: '12' },

        { type: 'Comp Off', balance: '4', total: '12' },
        { type: 'Holiday', balance: '4', total: 'N/A' },
        { type: 'Maternity', balance: '4', total: '12' },

    ]

    return (
        <Layout title={'My Leaves'} backButton>
            <Picker isDatePickerVisible={open} setDatePickerVisibility={setOpen} />

            <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
                <Text style={styles.title}>Choose Dates</Text>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setOpen(true)} style={styles.leftElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <View  style={styles.select}>
                            <Text style={styles.placeholder}>From</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpen(true)} style={styles.rightElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <View  style={styles.select}>
                            <Text style={styles.placeholder}>To</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <Text style={styles.title}>Leave Type</Text>
                <View style={styles.container}>
                    <View style={styles.leftElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <TouchableOpacity onPress={toggleDrawer} style={styles.select}>
                            <Text style={styles.placeholder}>Select</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <TouchableOpacity onPress={balanceToggle} style={styles.select}>
                            <Text style={styles.placeholder}>Balance</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={styles.title}>Reason</Text>
                <View style={styles.reasonContainer}>
                    <TextInput
                        style={styles.textinput}
                        multiline
                        numberOfLines={10}
                    />

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.blackButton}>
                        <Text style={styles.blackButtonText}>Submit</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteButton}>
                        <Text style={styles.whiteButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>



            </View>
            {isDrawerVisible && (
                <BottomSheet isModalVisible={isDrawerVisible} setModalVisible={setDrawerVisible} toggleModal={toggleDrawer} >
                    <View style={{ paddingTop: 30, margin: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#808080' }}>Choose Leave Type</Text>
                        {Name.map((item) => (
                            <TouchableOpacity onPress={toggleDrawer} key={item} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'lightgrey' }} />
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item}</Text>

                            </TouchableOpacity>
                        ))}

                    </View>
                </BottomSheet>
            )}
            {isBalanceModal && (
                <BottomSheet isModalVisible={isBalanceModal} setModalVisible={setIsBalanceModal} toggleModal={balanceToggle} >
                    <View style={styles.balanceModalContainer}>
                        <Text style={styles.balanceTitle}>Type</Text>
                        <Text style={styles.balanceTitle}>Balance</Text>
                        <Text style={styles.balanceTitle}>Total</Text>
                    </View>
                    {Balance.map((item, index) => (
                        <TouchableOpacity key={index} onPress={balanceToggle} style={styles.balanceModalContainerText}>
                            <Text style={styles.balanceTitle}>{item.type}</Text>
                            <Text style={[styles.balanceTitle, { position: 'absolute', left: '50%' }]}>{item.balance}</Text>
                            <Text style={[styles.balanceTitle, { position: 'absolute', right: 10 }]}>{item.total}</Text>
                        </TouchableOpacity>
                    ))}


                </BottomSheet>
            )}

        </Layout>
    )

}
export default ApplyLeave
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 70,
    },

    title: {
        paddingTop: 20,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        paddingHorizontal: 30,
        color: 'black',
        opacity: 0.7,
        marginBottom: 5
    },
    leftElement: {
        flexDirection: 'row',
        width: '51%',
        borderRightWidth: 0.5,
        borderRightColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center'

    },
    rightElement: {
        flexDirection: 'row',
        width: '53%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    select: {
        width: 90,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: 6,
        marginLeft: 20,
        borderWidth: 0.3,
        borderColor: 'ligthgrey'

    },
    placeholder: {
        fontFamily: 'Poppins-Regular',
        color: 'black',
        opacity: 0.6
    },
    reasonContainer: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        width: '90%',
        height: '80%',
        backgroundColor: '#f7f7f7',
        padding: 20
    },
    blackButton: {
        width: '90%',
        height: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    whiteButton: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: 'black',
        marginTop: 20
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 40
    },
    blackButtonText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold'
    },
    whiteButtonText: {
        color: 'black',
        fontFamily: 'Poppins-SemiBold'
    },
    balanceModalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 20
    },
    balanceModalContainerText: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20,
        height: 30,
        alignItems: 'center',

    },
    balanceTitle: {
        fontFamily: 'Poppins-SemiBold'
    }
})