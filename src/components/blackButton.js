import React from "react"
import { TouchableOpacity, Text, View } from "react-native"

const BlackButton = ({ onPress, title, disabled }) => (

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{ width: '95%', height: 55, backgroundColor: disabled ? '#343434' : 'black', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 15 }}>{title}</Text>
        </TouchableOpacity>
    </View>
)
export default BlackButton