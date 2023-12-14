import React, { useState } from "react";
import Layout from "../../components/layout";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, Text, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal } from "react-native";
import FilterDrawer from "../../components/BottomDrawer";
import { Image } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import DateFilter from "../../components/DateFilter";
import BlackButton from "../../components/blackButton";
import ApproveButton from "../../components/buttons/ApproveButton";
import RejectButton from "../../components/buttons/RejectButton";
import { CategorySelect, activeTab } from "../../lib/atom";
import { useRecoilState } from "recoil";
import DatePicker from "../../components/DatePicker";

const Card = ({ onPress, title, placeHolder, marginTop }) => (
    <View style={{ marginHorizontal: 20, marginTop }}>
        <Text style={{ textAlign: 'left', marginLeft: 15, textAlignVertical: 'center', marginBottom: 10, fontFamily: 'Poppins-Regular', fontSize: 16 }}>{title}</Text>
        <View style={{ width: '100%', borderRadius: 8, elevation: 2, backgroundColor: '#fff', height: 90, justifyContent: 'center', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ alignItems: 'flex-start', justifyContent: 'center', width: '70%', height: 45, marginRight: 10, borderRadius: 8, backgroundColor: '#f1f1f1' }}>
                <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Medium', opacity: 0.4 }}>{placeHolder}</Text>
            </TouchableOpacity>
        </View>
    </View>
)

const CardInput = ({ onPress, title, placeHolder, marginTop, marginBottom }) => (
    <View style={{ marginHorizontal: 20, marginTop, marginBottom }}>
        <Text style={{ textAlign: 'left', marginLeft: 15, textAlignVertical: 'center', marginBottom: 10, fontFamily: 'Poppins-Regular', fontSize: 16 }}>{title}</Text>
        <View style={{ width: '100%', borderRadius: 8, elevation: 2, backgroundColor: '#fff', height: 90, justifyContent: 'center', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ alignItems: 'flex-start', justifyContent: 'center', width: '70%', height: 45, marginRight: 10, borderRadius: 8, backgroundColor: '#f1f1f1' }}>
                <TextInput
                    placeholder={placeHolder}
                    style={{ marginLeft: 20, fontFamily: 'Poppins-Medium', width: '100%' }}
                />
            </TouchableOpacity>
        </View>
    </View>
)
const Name = ["Travel", "Food", "Fuel", "Mobile", "Uniform"]
const FirstRoute = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useRecoilState(CategorySelect);
    const [currentAdd, setCurrentAdd] = useState([1])
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const date = new Date()
    const [selectedDate, setSelectedDate] = useState(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }))
    const [index, setIndex] = useRecoilState(activeTab);



    const openModal = () => {
        setVisible(!visible);
    };
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };



    return (
        <>

            <View style={{
                justifyContent: 'center', flex: 1, backgroundColor: '#f7f7f7', textAlign: 'left'
            }}>
                {!selectedCategory && (
                    <>
                        <Card onPress={toggleDrawer} title={'Month'} placeHolder={'Dec 2023'} />
                        <Card onPress={openModal} title={'Category'} placeHolder={'Select'} marginTop={20} />
                    </>
                )}
                <DatePicker isDatePickerVisible={isDatePickerVisible} setDatePickerVisibility={setIsDatePickerVisible} setSelectedDate={setSelectedDate} />
                {selectedCategory == 'Travel' && (
                    <>

                        <ScrollView>
                            {currentAdd.map((item, index) => (
                                <View key={index}>
                                    <Card onPress={() => setIsDatePickerVisible(true)} title={'Date'} placeHolder={selectedDate ? selectedDate : '01 Dec'} marginTop={20} />
                                    <Card title={'Mode'} placeHolder={'Select'} marginTop={20} />
                                    <CardInput title={'From'} placeHolder={'Location'} marginTop={20} />
                                    <CardInput title={'To'} placeHolder={'Destination'} marginTop={20} />
                                    <CardInput title={'Purpose'} placeHolder={'Enter'} marginTop={20} />
                                    <CardInput title={'Distance'} placeHolder={'Enter Kilometers'} marginTop={20} />
                                    <CardInput title={'Amount'} placeHolder={'Enter Amount'} marginTop={20} marginBottom={20} />
                                </View>
                            ))}
                        </ScrollView>




                    </>


                )}

                {selectedCategory == "Food" && (
                    <ScrollView>
                        {currentAdd.map((item, index) => (
                            <View key={index}>
                                <Card onPress={() => setIsDatePickerVisible(true)} title={'Date'} placeHolder={selectedDate ? selectedDate : '01 Dec'} marginTop={20} />
                                <CardInput title={'People'} placeHolder={'Select'} marginTop={20} />
                                <CardInput title={'Place'} placeHolder={'Select'} marginTop={20} />
                                <CardInput title={'Purpose'} placeHolder={'Select'} marginTop={20} />
                                <CardInput title={'Amount'} placeHolder={'Enter Amount'} marginTop={20} marginBottom={20} />
                            </View>
                        ))}

                    </ScrollView>
                )}
                {selectedCategory == "Fuel" && (
                    <ScrollView>
                        {currentAdd.map((item, index) => (
                            <View key={index}>
                                <Card onPress={() => setIsDatePickerVisible(true)} title={'Date'} placeHolder={selectedDate ? selectedDate : '01 Dec'} marginTop={20} />
                                <CardInput title={'Vehical Number'} placeHolder={'Select'} marginTop={20} />
                                <CardInput title={'Fuel Price'} placeHolder={'Select'} marginTop={20} />
                                <CardInput title={'Quantity'} placeHolder={'Select'} marginTop={20} />
                                <CardInput title={'Amount'} placeHolder={'Enter Amount'} marginTop={20} marginBottom={20} />
                            </View>
                        ))}
                    </ScrollView>
                )}
                {selectedCategory == "Mobile" && (
                    <ScrollView>
                        {currentAdd.map((item, index) => (
                            <View key={index}>
                                <Card onPress={() => setIsDatePickerVisible(true)} title={'Date'} placeHolder={selectedDate ? selectedDate : '01 Dec'} marginTop={20} />
                                <CardInput title={'Mobile Number'} placeHolder={'Select'} marginTop={20} />

                                <CardInput title={'Amount'} placeHolder={'Enter Amount'} marginTop={20} marginBottom={20} />
                            </View>
                        ))}
                    </ScrollView>
                )}
                {selectedCategory == "Uniform" && (
                    <ScrollView>
                        {currentAdd.map((item, index) => (
                            <View key={index}>
                                <Card onPress={() => setIsDatePickerVisible(true)} title={'Date'} placeHolder={selectedDate ? selectedDate : '01 Dec'} marginTop={20} />
                                <CardInput title={'Purpose'} placeHolder={'Select'} marginTop={20} />

                                <CardInput title={'Amount'} placeHolder={'Enter Amount'} marginTop={20} marginBottom={20} />
                            </View>
                        ))}
                    </ScrollView>
                )}
                {selectedCategory && (
                    <View style={{ height: 100, width: '100%', backgroundColor: '#fff', elevation: 3, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setCurrentAdd(prevItems => [...prevItems, Math.random()])} style={{ height: 40, marginLeft: 10, backgroundColor: '#f1f1f1', width: '29%', borderRadius: 8, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="plus" size={16} />
                            <Text style={{ fontFamily: 'Poppins-Medium' }}>Add More</Text>
                        </TouchableOpacity>
                        <View style={{ width: '29%', marginLeft: 10 }}>
                            <ApproveButton onPress={() => setIndex(1)} title={'Save'} />
                        </View>
                        <View style={{ width: '29%', marginLeft: 10, marginRight: 10 }}>
                            <RejectButton onPress={() => {
                                setSelectedCategory(null)
                                setCurrentAdd([1])
                            }} title={'Submit'} />
                        </View>
                    </View>
                )}

            </View>
            {isDrawerVisible && (
                <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
            )}
            {visible && (
                <BottomSheet isModalVisible={visible} setModalVisible={setVisible} toggleModal={openModal} >
                    <View style={{ paddingTop: 30, margin: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#808080' }}>Choose a category</Text>
                        {Name.map((item) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedCategory(item)
                                openModal()
                            }} key={item} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                                <View style={{ width: 15, height: 15, borderRadius: 10, backgroundColor: 'lightgrey' }} />
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item}</Text>

                            </TouchableOpacity>
                        ))}

                    </View>

                </BottomSheet>
            )}
        </>

    );
}
const SecondRoute = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useRecoilState(CategorySelect);
    const [visible, setVisible] = useState(false);


    const openModal = () => {
        setVisible(!visible);
    };
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    return (
        <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
            <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                    <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                    <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2021</Text>
                </View>
                <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                    <Text onPress={openModal} style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, opacity: 0.5 }}>{selectedCategory ? selectedCategory : 'Select a Category'}</Text>
                </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 40, width: '95%', marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: '#fff', alignItems: 'center' }}>
                <Text style={{ marginLeft: 10, fontFamily: 'Poppins-Medium' }}>Date</Text>
                <Text style={{ fontFamily: 'Poppins-Medium' }}>Amount</Text>
                {selectedCategory == 'Travel' && (
                    <Text style={{ fontFamily: 'Poppins-Medium' }}>Mode</Text>
                )}
                {selectedCategory == 'Food' && (
                    <Text style={{ fontFamily: 'Poppins-Medium' }}>People</Text>
                )}
                {selectedCategory == 'Fuel' && (
                    <Text style={{ fontFamily: 'Poppins-Medium' }}>Quantity</Text>
                )}
                {selectedCategory == 'Mobile' && (
                    <Text style={{ fontFamily: 'Poppins-Medium' }}>Mobile</Text>
                )}
                <Text style={{ marginRight: 10, fontFamily: 'Poppins-Medium' }}>Details</Text>
            </View>

            {isDrawerVisible && (
                <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
            )}
            {visible && (
                <BottomSheet isModalVisible={visible} setModalVisible={setVisible} toggleModal={openModal} >
                    <View style={{ paddingTop: 30, margin: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#808080' }}>Choose a category</Text>
                        {Name.map((item) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedCategory(item)
                                openModal()
                            }} key={item} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                                <View style={{ width: 15, height: 15, borderRadius: 10, backgroundColor: 'lightgrey' }} />
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item}</Text>

                            </TouchableOpacity>
                        ))}

                    </View>

                </BottomSheet>
            )}
        </View>
    )
}

const ThirdRoute = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useRecoilState(CategorySelect);
    const [visible, setVisible] = useState(false);


    const openModal = () => {
        setVisible(!visible);
    };
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                    <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />
                    <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>Dec 2021</Text>
                </View>

                <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                    <Text onPress={openModal} style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, opacity: 0.5 }}>{selectedCategory}</Text>
                </View>
                <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                    <Foundation name="filter" size={24} color="black" />

                </View>
            </TouchableOpacity>
            {isDrawerVisible && (
                <DateFilter isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} toggleDrawer={toggleDrawer} />
            )}
            {visible && (
                <BottomSheet isModalVisible={visible} setModalVisible={setVisible} toggleModal={openModal} >
                    <View style={{ paddingTop: 30, margin: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#808080' }}>Choose a category</Text>
                        {Name.map((item) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedCategory(item)
                                openModal()
                            }} key={item} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 60, borderBottomWidth: 0.2, borderBottomColor: '#808080' }}>
                                <View style={{ width: 15, height: 15, borderRadius: 10, backgroundColor: 'lightgrey' }} />
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#808080' }}>{item}</Text>

                            </TouchableOpacity>
                        ))}

                    </View>

                </BottomSheet>
            )}
        </View>
    )
}
const MyClaims = () => {


    const [index, setIndex] = useRecoilState(activeTab);
    const [routes] = useState([
        { key: "first", title: "APPLY" },
        { key: "second", title: "SAVED" },
        { key: "third", title: "SUBMITTED" },

    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    const tabView = (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: "black" }}
                    style={{ backgroundColor: "white" }}
                    labelStyle={{ color: "black" }}
                />
            )}
        />
    )
    return (
        <Layout title={'My Claims'} edgeHitWidth={100}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: "black" }}
                        style={{ backgroundColor: "white" }}
                        labelStyle={{ color: "black" }}
                    />
                )}
            />
        </Layout>
    )

}
export default MyClaims