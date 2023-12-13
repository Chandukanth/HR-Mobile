import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ApprovedButton = ({ onPress, width }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: width ? width : '73%', height: 40, backgroundColor: '#DAECE2', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>
            <Text style={{ color: '#48a272', fontFamily: 'Poppins-SemiBold' }}>Approved</Text>
        </TouchableOpacity>
    )

}
export default ApprovedButton