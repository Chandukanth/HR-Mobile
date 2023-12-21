import React from "react";
import { View } from "react-native";
import ApprovedButton from "../buttons/ApprovedButton";
import ChatButton from "../buttons/ChatButton";
import RejectedButton from "../buttons/RejectedButton";

const StatusChat = ({ setIsChating, rejected }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            {rejected ? (
                <RejectedButton />
            ) : (
                <ApprovedButton />

            )}
            <ChatButton onPress={() => setIsChating(true)} />
        </View>
    )

}
export default StatusChat