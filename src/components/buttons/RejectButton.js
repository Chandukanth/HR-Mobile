import React from "react"
import { TouchableOpacity, Text, View } from "react-native"

const RejectButton = ({ onPress, title }) => (

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPress} style={{ borderWidth: 0.3, width: '100%', height: 40, backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 15 }}>{title}</Text>
        </TouchableOpacity>
    </View>
)
export default RejectButton