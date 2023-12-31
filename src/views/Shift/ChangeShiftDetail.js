import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from "react-native"
import Layout from "../../components/layout"
import { AntDesign, Foundation } from "@expo/vector-icons";
import Picker from "../../components/DatePicker";
import BottomSheet from "../../components/BottomSheet";
import Calendar from "../../../assets/calender.png"
import { formatDate } from "../../lib/Datetime";
import { useRecoilState } from "recoil";
import { User } from "../../lib/atom";
import ShiftChangeRequestService from "../../Services/ShiftChangeRequestService";

const shiftValues = [
    { name: 'Morning Shift', id: 0 },
    { name: 'Regular Shift', id: 1 },
    { name: 'Open Shift', id: 3 },
    { name: 'Open Shift - Consultants', id: 4 },
    { name: 'College Shift', id: 5 },

]

const ChangeShiftModal = ({ isDrawerVisible, setDrawerVisible, toggleDrawer, onPress }) => {
    return (
        <BottomSheet isModalVisible={isDrawerVisible} setModalVisible={setDrawerVisible} toggleModal={toggleDrawer} >
            <View style={{ paddingTop: 30, margin: 20 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#808080' }}>Choose Shift</Text>
                {shiftValues.map((item) => (
                    <TouchableOpacity onPress={() => onPress(item)} key={item} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'lightgrey' }} />
                        <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item.name}</Text>

                    </TouchableOpacity>
                ))}

            </View>
        </BottomSheet>
    )

}


const ChangeShift = ({ navigation }) => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isBalanceModal, setIsBalanceModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedChangeShift, setSelectedChangeShift] = useState("")
    const [selectedToShift, setSelectedChangeToShift] = useState("")
    const [open, setOpen] = useState(false)
    const [todateModal, setIsToDateModal] = useState(false)
    const [reason, setReason] = useState("")
    const [toDate, setTodate] = useState('')
    const [loggedInUser, setLoggedInUser] = useRecoilState(User)

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    const balanceToggle = () => {
        setIsBalanceModal(!isBalanceModal)
    }
    const submitForm = async () => {
        let data = {
            company: 1,
            from_date: formatDate(selectedDate),
            to_date: formatDate(toDate),
            reason: reason,
            status: 0,
            from_shift: selectedChangeShift?.id,
            to_shift: selectedToShift?.id,
            employee: loggedInUser?.id
        }
        let response = await ShiftChangeRequestService.post(data)
        if (response) {
            navigation.goBack()
        }
    }

    const selectChangeFrom = (item) => {
        setSelectedChangeShift(item);
        setDrawerVisible(false)
    }

    const selectChangeTo = (item) => {
        setSelectedChangeToShift(item)
        setIsBalanceModal(false)
    }

    return (
        <Layout title={'Change Shift'} backButton>
            <Picker setDate={setSelectedDate} date={selectedDate} isDatePickerVisible={open} setDatePickerVisibility={setOpen} />
            <Picker setDate={setTodate} date={toDate} isDatePickerVisible={todateModal} setDatePickerVisibility={setIsToDateModal} />


            <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
                <Text style={styles.title}>Choose Dates</Text>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setOpen(true)} style={styles.leftElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <View style={styles.select}>
                            <Text style={styles.placeholder}>{selectedDate ? formatDate(selectedDate) : 'From'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsToDateModal(true)} style={styles.rightElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <View style={styles.select}>
                            <Text style={styles.placeholder}>{toDate ? formatDate(toDate) : 'To'}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <Text style={styles.title}>Select Shift</Text>
                <View style={styles.container}>
                    <View style={styles.leftElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <TouchableOpacity onPress={toggleDrawer} style={styles.select}>
                            <Text style={styles.placeholder}>{selectedChangeShift ? selectedChangeShift.name : 'Change from'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightElement}>
                        <Image style={{ width: 20, height: 20 }} source={Calendar} />
                        <TouchableOpacity onPress={balanceToggle} style={styles.select}>
                            <Text style={styles.placeholder}>{selectedToShift ? selectedToShift.name : 'Change to'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={styles.title}>Reason</Text>
                <View style={styles.reasonContainer}>
                    <TextInput
                        style={styles.textinput}
                        multiline
                        numberOfLines={10}
                        onChangeText={setReason}
                    />

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={submitForm} style={styles.blackButton}>
                        <Text style={styles.blackButtonText}>Submit</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.whiteButton}>
                        <Text style={styles.whiteButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>



            </View>
            {isDrawerVisible && (
                <ChangeShiftModal isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} onPress={selectChangeFrom} />

            )}

            {isBalanceModal && (
                <ChangeShiftModal isDrawerVisible={isBalanceModal} setDrawerVisible={setIsBalanceModal} toggleDrawer={balanceToggle} onPress={selectChangeTo} />

            )}

        </Layout>
    )

}
export default ChangeShift
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
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: 6,
        marginLeft: 5,
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
        height: '50%',
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
        width: '48%',
        height: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    whiteButton: {
        width: '48%',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: 'black',
        marginLeft: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        position: 'absolute',
        bottom: 10,
        marginHorizontal: 20,
        left: 4
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