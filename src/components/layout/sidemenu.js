// SideMenuContent.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native';
import Attendance from "../../../assets/calender.png"
import Leave from "../../../assets/sidebarIcons/leaveIcon.png"
import salary from "../../../assets/sidebarIcons/salaryIcon.png"
import team from "../../../assets/sidebarIcons/teamIcon.png"
import claims from "../../../assets/sidebarIcons/claimsIcon.png"
import { useRoute } from '@react-navigation/core';
import CompanyService from '../../Services/CompanyService';
import { useRecoilState } from 'recoil';
import { company, projectId } from '../../lib/atom';
import AsyncStorageObject from '../../lib/AsyncStorage';



const SubMenu = ({ items, navigation, setMenuOpen }) => {


    const [isCollapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("MyAttendance")
    const route = useRoute();
    const routeNameArray = route.name.split('/');
    const menuItemValue = routeNameArray[0];


    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };



    const handleClick = (screen) => {
        setMenuOpen(false)
        if (screen) {
            setActiveMenu(screen)
            navigation.navigate(screen)
        }

    }

    return (
        <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={toggleCollapse}>
                <View style={{ flexDirection: 'row', paddingTop: '10%', paddingLeft: 10, alignItems: 'center' }}>
                    <Image style={{ width: 18, height: 18, objectFit: 'contain' }} source={items.image} />

                    <Text style={{ fontSize: 16, fontWeight: '300', color: 'black', fontFamily: 'Poppins-Medium', paddingLeft: 10 }}>{items.title}</Text>
                </View>
            </TouchableOpacity>

            <Collapsible easing={'easeInOutCubic'} collapsed={isCollapsed}>
                <View style={{ marginTop: 10 }}>
                    {items.subItems.map((subItem, index) => (
                        <TouchableOpacity onPress={() => handleClick(subItem?.screen)} key={index} style={{ backgroundColor: menuItemValue == subItem.screen ? '#f7f7f7' : '#fff', marginRight: 10 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingLeft: 15 }}>
                                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'lightgrey' }} />
                                <Text style={{ fontSize: 12, fontWeight: '300', paddingLeft: 15, fontFamily: 'Poppins-Light' }}>{subItem.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};
const SideMenuContent = ({ navigation, setMenuOpen, setIsClosing }) => {
    const [companyDetail, setCompanyDetail] = useRecoilState(company)
    const [selectedProject, setSelectedProject] = useRecoilState(projectId)
    useEffect(() => {
        if (companyDetail.length == 0) {
            getCompanyDetail()

        }
    }, [])

    const getCompanyDetail = async () => {
        const response = await CompanyService.get()
        setCompanyDetail(response.data)
    }
    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };
    const menuItems = [
        {
            title: 'Attendance', image: Attendance, subItems: [
                { name: 'My Attendance', screen: 'MyAttendance' },
                { name: 'Manage Attendance', screen: 'ManageAttendance' },
                { name: 'Team Attendance', screen: 'TeamAttendance' },
                { name: 'Attendance Requests', screen: 'AttendanceRequest' },
            ]
        },
        {
            title: 'Leaves', image: Leave, subItems: [
                { name: 'My Leaves', screen: 'MyLeaves' },
                { name: 'Leave Requests', screen: 'LeaveRequest' },
            ]
        },
        {
            title: 'Salary', image: salary, width: 16, subItems: [
                { name: 'My Salary', },
                { name: 'Team Salary', },
            ]
        },
        {
            title: 'Team', image: team, width: 16, subItems: [
                { name: 'Team Members', },
                { name: 'Hiring', },
            ]
        },
        {
            title: 'Shifts', image: Attendance, subItems: [
                { name: 'My Shift', screen: 'MyShifts' },
                { name: 'Shift Applications', screen: 'ShiftApplications' },
                { name: 'Change Shift', screen: 'ChangeShift' }
            ]
        },
        {
            title: 'Claims', image: claims, width: 20, subItems: [
                { name: 'My Claims', screen: 'MyClaims' },
                { name: 'Applications', screen: 'Applications' },
            ]
        },
    ];


    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                {/* First View (20px width) */}
                <View style={{ width: 40, flexDirection: 'column', justifyContent: 'space-between', marginTop: '20%', marginBottom: '20%', marginLeft: 10 }}>
                    <View style={{}}>
                        {companyDetail.map((item, index) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedProject(item.id);
                                setMenuOpen(false)
                            }} key={index} style={{ width: 40, height: 40, borderRadius: 30, backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ color: 'white' }}>{item?.name.substring(0, 2)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                    <TouchableOpacity onPress={() => {
                        setMenuOpen(false)
                        setIsClosing(false)
                        navigation.navigate('Login')
                        AsyncStorageObject.clearAll()
                    }} style={{ width: 40, height: 40, borderRadius: 30, backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="logout" size={18} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Second View (Remaining width) */}
                <ScrollView style={{ flex: 1, backgroundColor: '#fff', borderRadius: 12, margin: 10 }} showsVerticalScrollIndicator={false}>
                    {menuItems.map((item, index) => (
                        <SubMenu key={index} items={item} navigation={navigation} setMenuOpen={setMenuOpen} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default SideMenuContent;
