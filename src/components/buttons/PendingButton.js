import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PendingButton = ({ onPress, width }) => {
    return (
        <View onPress={onPress} style={{ width: width ? width : '73%', height: 40, backgroundColor: '#F9F3E1', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>
            <Text style={{ color: '#E2C26B', fontFamily: 'Poppins-SemiBold' }}>Pending</Text>
        </View>
    )

}
export default PendingButton