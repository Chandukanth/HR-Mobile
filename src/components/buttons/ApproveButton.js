import React from "react"
import { TouchableOpacity, Text, View } from "react-native"

const ApproveButton = ({ onPress, title }) => (

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPress} style={{ width: '100%', height: 40, backgroundColor: 'black', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize:15 }}>{title}</Text>
        </TouchableOpacity>
    </View>
)
export default ApproveButton