import React from "react";
import { View } from "react-native";
import ApprovedButton from "../buttons/ApprovedButton";
import ChatButton from "../buttons/ChatButton";

const StatusChat = ({ setIsChating }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <ApprovedButton />
            <ChatButton onPress={() => setIsChating(true)} />
        </View>
    )

}
export default StatusChat