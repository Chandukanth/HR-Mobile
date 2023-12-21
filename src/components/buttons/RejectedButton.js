import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RejectedButton = ({ onPress, width }) => {
    return (
        <View onPress={onPress} style={{ width: width ? width : '73%', height: 40, backgroundColor: '#FCD8D8', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>
            <Text style={{ color: '#FF4545', fontFamily: 'Poppins-SemiBold' }}>Rejected</Text>
        </View>
    )

}
export default RejectedButton