import React, { useState } from "react";
import Layout from "../../components/layout";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, Text } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal } from "react-native";
import FilterDrawer from "../../components/BottomDrawer";
import { Image } from "react-native";
import BottomSheet from "../../components/BottomSheet";
const FirstRoute = () => (
    <></>
);

const SecondRoute = () => (
    <></>
)

const ThirdRoute = () => (
    <>
    </>
)
const MyClaims = () => {


    const [index, setIndex] = useState(0);
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
        <Layout title={'My Claims'} >
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