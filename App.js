import React from 'react';
import * as Font from "expo-font";
import { StatusBar } from 'react-native'
import { ToastProvider } from 'react-native-toast-notifications'
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyAttendance from './src/views/Attendance/myAttendance';
import ManageAttendance from './src/views/Attendance/manageAttendance';
import { navigationRef } from './src/lib/RootNavigation';
import TeamAttendance from './src/views/Attendance/teamAttendance';
import AttendanceRequest from './src/views/Attendance/attendanceRequest';
import AttendanceDetail from './src/components/attendanceDetail';
import AttendanceRequestDetail from './src/views/Attendance/attendanceRequestDetail';
import MyLeaves from './src/views/leaves/myLeaves';
import LeaveRequest from './src/views/leaves/leaveRequests';
import ApplyLeave from './src/views/leaves/applyLeave';
import MyShifts from './src/views/Shift/myShift'
import ShiftApplications from './src/views/Shift/shiftApplication';
import MyClaims from './src/views/Claims/myClaims';
import ChangeShift from './src/views/Shift/changeShift';
import { RecoilRoot } from 'recoil';
import Applications from './src/views/Claims/applications';
import Login from './src/views/Auth/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorageObject from './src/lib/AsyncStorage';
import AsyncStorage from './src/helper/AsyncStorage';
const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Bold': require("./assets/fonts/Poppins-Bold.ttf"),
    'Poppins-Regular': require("./assets/fonts/Poppins-Regular.ttf"),
    'Poppins-SemiBold': require("./assets/fonts/Poppins-SemiBold.ttf"),
    'Poppins-Medium': require("./assets/fonts/Poppins-Medium.ttf"),
    'Poppins-Light': require("./assets/fonts/Poppins-Light.ttf"),
    'Poppins-ExtraLight': require("./assets/fonts/Poppins-ExtraLight.ttf"),
    'Poppins-Thin': require("./assets/fonts/Poppins-Thin.ttf"),

  });
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [accessTokenExist, setAccessTokenExist] = React.useState(false)
  StatusBar.setBackgroundColor("#fff")
  StatusBar.setBarStyle("dark-content")
  const [isFontLoaded, setFontLoaded] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const sessionToken = await AsyncStorageObject.getItem(AsyncStorage.ACCESS_TOKEN)
      if (sessionToken) {
        setAccessTokenExist(true)
      } else {
        setAccessTokenExist(false)
      }
    })();
  }, []);

  React.useEffect(() => {
    loadFonts()
      .then(() => setFontLoaded(true))
      .catch(error => console.error("Font loading error:", error));
  }, [])

  if (!isFontLoaded) {
    return null;
  }
  const queryClient = new QueryClient()
  return (
    <NavigationContainer ref={navigationRef}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Toast />
          <RecoilRoot>

            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={accessTokenExist ? 'MyAttendance' : "Login"}
            >

              {/* Login */}
              <Stack.Screen name="Login" component={Login} />

              {/* Attendance */}
              <Stack.Screen name="MyAttendance" component={MyAttendance} />
              <Stack.Screen name="ManageAttendance" component={ManageAttendance} />
              <Stack.Screen name="TeamAttendance" component={TeamAttendance} />
              <Stack.Screen name="AttendanceRequest" component={AttendanceRequest} />
              <Stack.Screen name="AttendanceDetail" component={AttendanceDetail} />
              <Stack.Screen name="AttendanceRequestDetail" component={AttendanceRequestDetail} />

              <Stack.Screen name="MyLeaves" component={MyLeaves} />
              <Stack.Screen name="LeaveRequest" component={LeaveRequest} />
              <Stack.Screen name="ApplyLeave" component={ApplyLeave} />

              <Stack.Screen name="MyShifts" component={MyShifts} />
              <Stack.Screen name="ShiftApplications" component={ShiftApplications} />
              <Stack.Screen name="ChangeShift" component={ChangeShift} />


              <Stack.Screen name="MyClaims" component={MyClaims} />
              <Stack.Screen name="Applications" component={Applications} />



            </Stack.Navigator>

          </RecoilRoot>
        </ToastProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;