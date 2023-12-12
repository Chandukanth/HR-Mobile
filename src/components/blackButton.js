import React from "react"
import { TouchableOpacity, Text, View } from "react-native"

const BlackButton = ({ onPress, title }) => (

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPress} style={{ width: '95%', height: 55, backgroundColor: 'black', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize:15 }}>{title}</Text>
        </TouchableOpacity>
    </View>
)
export default BlackButton