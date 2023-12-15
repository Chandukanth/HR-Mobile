import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { AUTH_URL } from "../../../config";
import { useToast } from "react-native-toast-notifications";
import AsyncStorageObject from "../../lib/AsyncStorage";
import AsyncStorage from "../../helper/AsyncStorage";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigation = useNavigation()
    const toast = useToast();

    useEffect(() => {
        (async () => {
            const sessionToken = await AsyncStorageObject.getItem(AsyncStorage.ACCESS_TOKEN)
            if (sessionToken) {
                navigation.navigate("MyAttendance");
            }
        })();
    }, []);
    const handleLogin = async () => {

        if (!username.trim() && !password.trim()) {
            setUsernameError("Username is required");
            setPasswordError("Password is required")
            return;
        }
        if (!username.trim()) {
            setUsernameError("Username is required");
            return;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            return;
        }

        try {
            let body = {
                username: username.toLowerCase(),
                password: password
            }
            axios.post(AUTH_URL, body).then(async (response) => {
                if (response.data) {
                    await AsyncStorageObject.setItem(AsyncStorage.ACCESS_TOKEN, response.data.access_token)
                    await AsyncStorageObject.setItem(AsyncStorage.REFRESH_TOKEN, response.data.refresh_token)
                }
                toast.show('success ', {
                    type: "success",
                    placement: "top",
                    duration: 1000,
                    offset: 100,
                    animationType: "zoom-in",
                });
                navigation.navigate("MyAttendance")
            }).catch((error) => {
                const errorRequest = error?.response?.request;
                let errorMessage = JSON.parse(errorRequest.response).detail;
                toast.show('Invalid username or password ', {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 100,
                    animationType: "zoom-in",
                });
            })
            // Make a login request using Axios (replace with your actual API endpoint)

        } catch (error) {

        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={[styles.input, usernameError && styles.inputError]}
                placeholder="Username"
                onChangeText={(text) => {
                    setUsername(text)
                    if (text.length == 0) {
                        setUsernameError("Username is required");
                    } else {
                        setUsernameError("")
                    }
                }}
                value={username}
            />
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

            <TextInput
                style={[styles.input, passwordError && styles.inputError]}
                placeholder="Password"
                onChangeText={(text) => {
                    setPassword(text)
                    if (text.length == 0) {
                        setPasswordError("Password is required")
                    } else {
                        setPasswordError("")
                    }
                }}
                value={password}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        justifyContent: "center",
        marginHorizontal: 30

    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: "Poppins-Medium",
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: "lightgrey",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    inputError: {
        borderColor: "red",
    },
    loginButton: {
        backgroundColor: "black",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 55,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontFamily: "Poppins-Medium",
        fontSize: 15,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default Login;
