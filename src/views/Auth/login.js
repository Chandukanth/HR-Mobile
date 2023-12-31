import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { AUTH_URL } from "../../../config";
import { useToast } from "react-native-toast-notifications";
import AsyncStorageObject from "../../lib/AsyncStorage";
import AsyncStorage from "../../helper/AsyncStorage";
import { useRecoilState } from "recoil";
import { projectId } from "../../lib/atom";
import { endpoints } from "../../helper/ApiendPoints";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [accessTokenExist, setAccessTokenExist] = React.useState(false)
    const [companyId, setCompanyId] = useRecoilState(projectId)
    const navigation = useNavigation()
    const toast = useToast();
    React.useEffect(() => {
        (async () => {
            setAccessTokenExist(true)
            const sessionToken = await AsyncStorageObject.getItem(AsyncStorage.ACCESS_TOKEN)
            if (sessionToken) {

                navigation.navigate("MyAttendance")
                setAccessTokenExist(false)
            } else {
                setAccessTokenExist(false)
            }
        })();
    }, []);


    const handleLogin = async () => {
        setIsLoading(true)
        if (!username.trim() && !password.trim()) {
            setUsernameError("Username is required");
            setPasswordError("Password is required")
            setIsLoading(false)

            return;
        }
        if (!username.trim()) {
            setUsernameError("Username is required");
            setIsLoading(false)

            return;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            setIsLoading(false)

            return;
        }

        try {
            let body = {
                username: username,
                password: password
            }
            axios.post(AUTH_URL, body).then(async (response) => {
                if (response.data) {
                    await AsyncStorageObject.setItem(AsyncStorage.ACCESS_TOKEN, response.data.access_token)
                    await AsyncStorageObject.setItem(AsyncStorage.REFRESH_TOKEN, response.data.refresh_token)
                    setCompanyId(1)
                    navigation.navigate("MyAttendance")

                    let sessionToken = response.data.access_token
                    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;
                    let company = await axios.get(`${endpoints().CompanyApi}`)
                    setCompanyId(company.data.data[0].id)

                }
                toast.show('success ', {
                    type: "success",
                    placement: "top",
                    duration: 1000,
                    offset: 100,
                    animationType: "zoom-in",
                });
                navigation.navigate("MyAttendance")
                setIsLoading(false)

            }).catch((error) => {
                setIsLoading(false)
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
        console.log("🚀 ~ file: login.js:103 ~ handleLogin ~ error:", error)

        }

    };



    return (
        <>
            {accessTokenExist ? (
                <View style={styles.container}>
                    <Text>Loading....</Text>
                </View>
            ) : (
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

                    <TouchableOpacity disabled={isLoading} style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.buttonText}> {isLoading ? <ActivityIndicator size="small" color="#fff" /> : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
            )}

        </>

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
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default Login;
