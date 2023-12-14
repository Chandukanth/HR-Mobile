import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import BottomSheet from "../../components/BottomSheet";
import DateFilter from "../../components/DateFilter";
import Layout from "../../components/layout";
import { CategorySelect } from "../../lib/atom";

const Applications = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [visible, setVisible] = useState(false);
    const Name = ["Travel", "Food", "Fuel", "Mobile", "Uniform"]
    useEffect(() => {
        if (selectedCategory) {
            const backAction = () => {
                setSelectedCategory(null)
                return true;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

            return () => {
                backHandler.remove();
            };
        }
    }, [selectedCategory]);

    const openModal = () => {
        setVisible(!visible);
    };
    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };
    return (
        <Layout title={'Applications'}>
            <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
                {selectedCategory ? (
                    <>
                        <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, backgroundColor: '#fff' }}>
                            <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                                <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>All Months</Text>
                            </View>

                            <View style={{ opacity: 1, alignItems: 'center', marginRight: 50 }}>
                                <Text onPress={openModal} style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, opacity: 0.5 }}>{selectedCategory}</Text>
                            </View>
                            <View style={{ opacity: 1, alignItems: 'center', marginRight: 20 }}>
                                <Foundation name="filter" size={24} color="black" />

                            </View>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: 60, backgroundColor: '#fff', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 10, alignItems:'center' }}>
                                <Text style={{ fontSize: 18, color: 'black', opacity: 0.7, fontFamily: 'Poppins-SemiBold', marginLeft: 20 }}>Name</Text>
                                <Text style={{ fontSize: 18, color: 'black', opacity: 0.7, fontFamily: 'Poppins-SemiBold' }}>Requests</Text>

                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={toggleDrawer} style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, backgroundColor: '#fff' }}>
                            <View style={{ flexDirection: 'row', opacity: 1, alignItems: 'center', marginLeft: 20 }}>
                                <Text style={{ paddingLeft: 20, fontFamily: 'Poppins-Light' }}>All Months</Text>
                            </View>
                        </TouchableOpacity>
                        {Name.map((item, index) => (
                            <TouchableOpacity onPress={() => setSelectedCategory(item)} key={index} style={{ justifyContent: 'center', width: '90%', paddingHorizontal: 20, height: 60, elevation: 2, backgroundColor: '#fff', marginTop: 10, marginLeft: 15, borderRadius: 3 }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', opacity: 0.5 }}>{item}</Text>
                            </TouchableOpacity>
                        ))}

                    </>
                )}

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
        </Layout>
    )
}
export default Applications