import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "../../../assets/avatar/avatar2.png";

const ChattingScreen = ({ shortItems, expandItems }) => {

    const [typing, setTyping] = useState(false)
    const [isCollapsed, setCollapsed] = useState(false)
    const [expand, setExpand] = useState(false)

    const handleTextChange = (text) => {
        setTyping(text.length > 0);
        if (text.length == 0) {
            setCollapsed(false)
        } else {
            setCollapsed(true)

        }
    };
    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };
    return (
        <View style={{ backgroundColor: '#f7f7f7', flex: 1, alignItems: 'center' }}>
            {!expand ? (
                <TouchableOpacity activeOpacity={1}  style={{width : '100%', alignItems:'center', marginTop : 20}}  onPress={() => setExpand(true)}>
                    {shortItems}
                </TouchableOpacity>
            ) : (
                <TouchableOpacity activeOpacity={1} style={{width : '100%', alignItems:'center', marginTop : 20}} onPress={() => setExpand(false)}>
                    {expandItems}
                 </TouchableOpacity>
            )}

            <View style={{ width: '90%', position: 'absolute', bottom: 10, flexDirection: 'row', marginLeft: 30, alignItems: 'center', backgroundColor : '#f7f7f7' }}>
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
    )
}
export default ChattingScreen