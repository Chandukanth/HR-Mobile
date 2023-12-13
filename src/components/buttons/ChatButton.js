import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Chat from "../../../assets/new.png"

const ChatButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 10, width: 40, backgroundColor: '#f7f7f7', borderRadius: 8, marginLeft: 10 }}>
            <Image style={{ width: 30, height: 30, marginTop: 5 }} source={Chat} />
        </TouchableOpacity>
    )
}
export default ChatButton