import React from "react"
import { TouchableOpacity, Text } from "react-native"

const BlackButton = ({ onPress, title }) => {
    <TouchableOpacity onPress={onPress} style={{ width: '100%', height: 40, backgroundColor: 'black', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
        <Text style={{ color: 'white', fontFamily: 'Poppins-Light' }}>{title}</Text>
    </TouchableOpacity>
}
export default BlackButton